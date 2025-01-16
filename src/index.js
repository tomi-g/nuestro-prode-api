const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const questionsRoutes = require('./routes/questions');
const answersRoutes = require('./routes/answers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRoutes);
app.use('/api/answers', answersRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
