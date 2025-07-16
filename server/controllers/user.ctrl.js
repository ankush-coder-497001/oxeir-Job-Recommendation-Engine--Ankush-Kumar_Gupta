// controllers/userController.js
const User = require('../models/user.model');

const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate('appliedJobs');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      skillScore: user.skillScore,
      completedCourses: user.completedCourses,
      quizTags: user.quizTags,
      goals: user.goals,
      appliedJobs: user.appliedJobs.map(job => ({
        jobId: job._id,
        title: job.title,
        company: job.company,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getUserHistory };
