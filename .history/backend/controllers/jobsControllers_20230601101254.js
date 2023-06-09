// Import Job model
const Job = require('../models/Job');

// List all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ status: 1, date: -1 }); // Sort first by status, then by date
    res.json(jobs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// Submit a new job
exports.createJob = async (req, res) => {
    try {
      const newJob = new Job(req.body);
      const savedJob = await newJob.save();
      res.json(savedJob);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

// Update a single job
exports.updateJob = async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedJob);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
// Archive a specific job
exports.archiveJob = async (req, res) => {
    try {
      const archivedJob = await Job.findByIdAndUpdate(req.params.id, { status: 'archived' }, { new: true });
      res.json(archivedJob);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

// Batch update jobs
exports.updateJobsBatch = async (req, res) => {
    try {
      const { status, updates } = req.body; // Expected request body: { "status": "<status>", "updates": { "<field>": "<value>", ... } }
      const updatedJobs = await Job.updateMany({ status }, updates, { new: true });
      res.json(updatedJobs);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

// Filter jobs by status
exports.filterJobsByStatus = async (req, res) => {
    try {
      const status = req.params.status; // Expected URL: /jobs/status/:status
      const jobs = await Job.find({ status });
      res.json(jobs);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };