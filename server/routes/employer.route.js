const express = require('express');
const router = express.Router();
const { createJob, getAllJobs } = require('../controllers/employer.ctrl');
const authenticateUser = require('../middlewares/auth');

router.post('/create-job', authenticateUser, createJob);
router.get('/jobs', authenticateUser, getAllJobs);

module.exports = router;
