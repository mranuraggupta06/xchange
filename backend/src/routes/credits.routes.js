const express = require('express');
const { transferCredits } = require('../services/credit.service');
const User = require('../models/user.model');
const { jwtAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// get current user's profile (protected)
router.get('/me', jwtAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// transfer credits: learner (authenticated) pays teacherId
router.post('/transfer', jwtAuth, async (req, res, next) => {
  try {
    const learnerId = req.user._id;
    const { teacherId, amount } = req.body;
    const result = await transferCredits(learnerId, teacherId, Number(amount));
    res.json({ ok: true, result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
