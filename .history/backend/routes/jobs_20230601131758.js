// Import Express
const express = require('express');
// Create a new router
const router = express.Router();

// Import jobs controller
const jobsController = require('../controllers/jobsControllers');

// POST route to submit a new job
router.post('/', jobsController.createJob);

// GET route to list all jobs
router.get('/', jobsController.getJobs);

// PUT route to update a single job
router.put('/:id', jobsController.updateJob);

// PUT route to batch update jobs
// router.put('/', jobsController.updateJobsBatch);

// PUT route to archive a job
router.put('/archive/:id', jobsController.archiveJob);

// GET route to filter jobs by status
router.get('/status/:status', jobsController.filterJobsByStatus);

// GET a job by ID
router.get('/:id', jobsController.getJob);

// Batch update job status
router.put('/batch', async (req, res) => {
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
  });
  

// Export the router
module.exports = router;
