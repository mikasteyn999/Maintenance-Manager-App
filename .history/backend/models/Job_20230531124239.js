// Import mongoose module
const mongoose = require('mongoose');

// Define a schema using mongoose's Schema method
const Schema = mongoose.Schema;

// Define the Job schema
const JobSchema = new Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  priority: { type: Number, required: true },
  status: { type: String, required: true, default: 'submitted' },
  date: { type: Date, default: Date.now }
});

// Create a model from the Job schema
const Job = mongoose.model('Job', JobSchema);

// Export the Job model
module.exports = Job;

