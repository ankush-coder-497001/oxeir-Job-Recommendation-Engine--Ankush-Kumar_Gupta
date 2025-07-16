// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserHistory } = require('../controllers/user.ctrl');
const authenticateUser = require('../middlewares/auth');

router.get('/:id/history', authenticateUser, getUserHistory);

module.exports = router;
