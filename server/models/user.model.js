const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () {
      return this.role === 'user';
    },
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'employer'],
    required: true
  },
  // Fields for users only
  skillScore: {
    type: Number,
    default: 0
  },
  completedCourses: {
    type: [String],
    default: []
  },
  quizTags: {
    type: [String],
    default: []
  },
  goals: {
    type: [String],
    default: []
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
