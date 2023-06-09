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

// PUT route to batch update jobs
router.put('/batch', jobsController.updateJobsBatch);

// PUT route to update a single job
router.put('/:id', jobsController.updateJob);

// PUT route to archive a job
router.put('/archive/:id', jobsController.archiveJob);

// GET a job by ID
router.get('/:id', jobsController.getJob);

// Export the router
module.exports = router;
