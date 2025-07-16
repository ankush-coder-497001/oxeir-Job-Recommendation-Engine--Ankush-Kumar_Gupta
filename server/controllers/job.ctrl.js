// controllers/jobController.js
const User = require('../models/user.model');
const Job = require('../models/job.model');

const recommendJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate('appliedJobs');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const allJobs = await Job.find();
    const appliedJobIds = new Set(user.appliedJobs.map(job => String(job._id)));

    const userSkills = [
      ...(user.completedCourses || []),
      ...(user.quizTags || [])
    ].map(skill => String(skill).toLowerCase());

    const userGoals = (user.goals || []).map(goal => String(goal).toLowerCase());
    const userSkillScore = parseInt(user.skillScore) || 0;

    const recommendedJobs = [];

    for (const job of allJobs) {
      const jobIdStr = String(job._id);
      if (appliedJobIds.has(jobIdStr)) continue; // skip applied jobs

      let score = 0;
      const reasons = [];

      const requiredSkills = (job.requiredSkills || []).map(s => String(s).toLowerCase());
      const jobTags = (job.jobTags || []).map(t => String(t).toLowerCase());
      const jobThreshold = parseInt(job.skillScoreThreshold) || 100;

      // 🔹 Skill Overlap (50%)
      const matchedSkills = requiredSkills.filter(skill => userSkills.includes(skill));
      const skillOverlapScore = requiredSkills.length
        ? (matchedSkills.length / requiredSkills.length) * 50
        : 0;

      if (matchedSkills.length === 0) {
        reasons.push('No matching skills found');
        continue; // Skip rest, no point if no skills matched
      }

      if (skillOverlapScore > 0) {
        reasons.push(`Matched skills: ${matchedSkills.join(', ')}`);
        score += skillOverlapScore;
      }

      // 🔹 SkillScore Proximity (20%)
      const proximityScore = userSkillScore >= jobThreshold
        ? 20
        : (userSkillScore / jobThreshold) * 20;

      if (proximityScore >= 10) {
        reasons.push(`SkillScore ${userSkillScore}/${jobThreshold}`);
        score += proximityScore;
      }

      // 🔹 Goal/Tag Match (20%)
      const tagMatches = jobTags.filter(tag => userGoals.includes(tag));
      const tagMatchScore = jobTags.length
        ? (tagMatches.length / jobTags.length) * 20
        : 0;

      if (tagMatchScore > 0) {
        reasons.push(`Goal/tag match: ${tagMatches.join(', ')}`);
        score += tagMatchScore;
      }

      // 🔹 Not Applied Bonus (10%)
      score += 10;

      recommendedJobs.push({
        jobId: job._id,
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        requiredSkills: job.requiredSkills || [],
        skillScoreThreshold: job.skillScoreThreshold || 0,
        tags: job.jobTags || [],
        matchScore: Math.round(score),
        reason: reasons.join(' | ') || 'General match'
      });
    }

    // Sort and return top 10
    const topResults = recommendedJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    return res.json(topResults);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = { recommendJobs };
