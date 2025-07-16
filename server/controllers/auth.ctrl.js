const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, skillScore, completedCourses, quizTags, goals } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object with required fields
    const userObj = {
      email,
      password: hashedPassword,
      role
    };

    // Add user-specific fields if role is 'user'
    if (role === 'user') {
      userObj.name = name;
      userObj.skillScore = parseInt(skillScore);
      userObj.completedCourses = Array.isArray(completedCourses) ? completedCourses : [];
      userObj.quizTags = Array.isArray(quizTags) ? quizTags : [];
      userObj.goals = Array.isArray(goals) ? goals : [];
    }

    const user = new User(userObj);


    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    user.token = token; // Store token in user document

    await user.save();

    res.status(201).json({ message: 'User registered successfully', token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ message: 'Login successful', token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
