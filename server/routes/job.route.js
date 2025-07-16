// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { recommendJobs } = require('../controllers/job.ctrl');
const authenticateUser = require('../middlewares/auth');

router.get('/recommend-jobs', authenticateUser, recommendJobs);

module.exports = router;
