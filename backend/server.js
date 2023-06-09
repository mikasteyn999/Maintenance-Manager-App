// Import the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const jobsRouter = require('./routes/jobs');
const cors = require('cors');

// Initialize an Express app
const app = express();

//Use cors
app.use(cors());

// Use Express's built-in JSON parser middleware, so we can send JSON responses to the client
app.use(express.json());

// Connect to MongoDB with Mongoose
// Load environment variables from .env file
require('dotenv').config()
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Use the jobsRouter for all paths that start with /api/jobs
app.use('/api/jobs', jobsRouter);

// Set port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
