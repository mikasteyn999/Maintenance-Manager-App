// Import Job model
const Job = require('../models/Job');

// List all jobs
exports.getJobs = async (req, res) => {
  try {
    let query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    const jobs = await Job.find(query).sort({ status: 1, date: -1 }); // Sort first by status, then by date
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

  // Archive a job
exports.archiveJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      await Job.findByIdAndUpdate(jobId, { status: 'Archived' });
      res.status(200).json({ message: 'Job archived successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to archive job' });
    }
};
  

// Batch update jobs
exports.updateJobsBatch = async (req, res) => {
  const { jobIds, status } = req.body;
  console.log(`Received batch update request with jobIds: ${jobIds} and status: ${status}`);

  if (!jobIds || jobIds.length === 0 || !status) {
    console.error('Bad Request: Missing jobIds or status in request body');
    return res.status(400).json({
      message: 'Bad Request: Missing jobIds or status in request body',
    });
  }
  try {
    const updateResult = await Job.updateMany(
      { _id: { $in: jobIds } },
      { $set: { status: status } }
    );
    console.log(`Batch update result: ${JSON.stringify(updateResult)}`);
    return res.json({
      message: 'Batch update successful',
    });
  } catch (error) {
    console.error(`Internal Server Error: Could not update jobs: ${error}`);
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
