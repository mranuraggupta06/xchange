const mongoose = require('mongoose');

const CreditTransactionSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  amount: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ['session_payment', 'seed', 'adjustment', 'refund'], default: 'session_payment' },
  status: { type: String, enum: ['pending', 'complete', 'refunded'], default: 'complete' },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CreditTransaction', CreditTransactionSchema);
