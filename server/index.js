// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();

const app = express();

// DB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middlewares
const ORIGIN = process.env.CLIENT_URL || 'http://localhost:5173'
console.log(ORIGIN)
app.use(express.json());
app.use(cors({
  origin: ORIGIN,
  credentials: true
}));
app.use(helmet());



// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
  res.send('Job Recommendation API is running.');
});


//routes 
const authRouts = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const jobRoutes = require('./routes/job.route');
const employerRoutes = require('./routes/employer.route')

app.use('/api/auth', authRouts);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employers', employerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
