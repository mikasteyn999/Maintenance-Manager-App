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
    const { jobIds, status } = req.body;
    if (!jobIds || jobIds.length === 0 || !status) {
      return res.status(400).json({
        message: 'Bad Request: Missing jobIds or status in request body',
      });
    }
    try {
      await Job.updateMany(
        { _id: { $in: jobIds } },
        { $set: { status: status } }
      );
      return res.json({
        message: 'Batch update successful',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error: Could not update jobs',
      });
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

// Get a job by ID
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
