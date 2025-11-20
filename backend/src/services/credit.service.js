const mongoose = require('mongoose');
const User = require('../models/user.model');
const CreditTransaction = require('../models/creditTransaction.model');

async function transferCredits(learnerId, teacherId, amount) {
  if (!amount || amount <= 0) throw new Error('Amount must be a positive number');
  if (!learnerId || !teacherId) throw new Error('Both learnerId and teacherId are required');
  if (learnerId.toString() === teacherId.toString()) throw new Error('Learner and teacher must be different');

  const tx = await CreditTransaction.create({
    from: learnerId,
    to: teacherId,
    amount,
    type: 'session_payment',
    status: 'pending',
    createdAt: new Date()
  });

  // Atomic single-document decrement for learner
  const learner = await User.findOneAndUpdate(
    { _id: learnerId, credits: { $gte: amount } },
    { $inc: { credits: -amount } },
    { new: true }
  );

  if (!learner) {
    tx.status = 'refunded';
    await tx.save();
    throw new Error('Insufficient credits or learner not found');
  }

  const teacher = await User.findByIdAndUpdate(
    teacherId,
    { $inc: { credits: amount } },
    { new: true }
  );

  if (!teacher) {
    await User.findByIdAndUpdate(learnerId, { $inc: { credits: amount } });
    tx.status = 'refunded';
    await tx.save();
    throw new Error('Teacher not found, refunded learner');
  }

  tx.status = 'complete';
  await tx.save();

  return { tx, learner, teacher };
}

module.exports = { transferCredits };
