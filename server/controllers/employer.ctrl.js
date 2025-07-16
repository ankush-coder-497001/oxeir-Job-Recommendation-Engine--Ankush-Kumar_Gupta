// controllers/employerController.js
const Job = require('../models/job.model');
const User = require('../models/user.model')

const createJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can create jobs' });
    }

    const { title, company, location, requiredSkills, skillScoreThreshold, jobTags } = req.body;

    const job = new Job({
      title,
      company,
      location,
      requiredSkills,
      skillScoreThreshold,
      jobTags
    });

    await job.save();

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err.message });
  }
};


const getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find();
    const formattedJobs = jobs.map(job => ({
      jobId: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      requiredSkills: job.requiredSkills,
      skillScoreThreshold: job.skillScoreThreshold,
      tags: job.jobTags
    }));

    res.json(formattedJobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllJobs, createJob };
