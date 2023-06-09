// Import necessary modules
import React, { useEffect, useState } from 'react';
import Job from './Job';
import JobForm from './JobForm';
import '../style/JobsList.css';

// Define the JobsList component
const JobsList = () => {
  // Initialize state variables
  const [jobs, setJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState("date"); // Default sort order is by date
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch jobs function
  const fetchJobs = async () => {
    let url = `http://localhost:5000/api/jobs?sort=${sortOrder}`; 
    if (filterStatus) url += `&status=${filterStatus}`; // Add status query parameter if a status filter is selected
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data.filter(job => job.status !== 'Archived')); // Filter out archived jobs
  };

  // Fetch jobs when the component is first rendered and when sortOrder or filterStatus changes
  useEffect(() => {
    fetchJobs();
  }, [sortOrder, filterStatus]);

  // Update sort order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };


    const handleBatchUpdate = async () => {
      const status = document.getElementById('batchStatusUpdate').value;
      if (!status) {
        console.error('No status selected for batch update');
        return;
      }
      if (selectedJobs.length === 0) {
        console.error('No jobs selected for batch update');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/jobs/batch', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobIds: selectedJobs, status }),
        });
    
        if (response.ok) {
          console.log('Batch update successful');
          setSelectedJobs([]); // Clear selected jobs after successful update
          // Here, fetch the jobs again
          fetchJobs();
        } else {
          console.error('Failed to batch update jobs');
        }
      } catch (error) {
        console.error(`An error occurred: ${error}`);
      }
    };

    // Function to handle archive
    const handleArchive = async (jobId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/archive/${jobId}`, {
          method: 'PUT',
        });

        if (!response.ok) {
          console.error('Failed to archive job');
        } else {
          setJobs(jobs.filter(job => job._id !== jobId)); // Remove the archived job from the local state
        }
      } catch (error) {
        console.error(`An error occurred: ${error}`);
      }
    };

    // Pass handleArchive as a prop to the Job component
    {jobs.map((job) => (
      <Job key={job._id} job={job} handleArchive={handleArchive} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
    ))}

    const addNewJob = (newJob) => {
      setJobs([newJob, ...jobs]);
    };
    
    // Pass the function to JobForm as a prop
    <JobForm addNewJob={addNewJob} />
    


    return (
      <div className='jobs-list'>
        <div className='jobs-header'>JOBS:</div>

        {/* Add sort order dropdown */}
        <select className='select-sort' value={sortOrder} onChange={handleSortChange}> 
          <option value="">Sort by</option>
          <option value="date">Submit date</option>
          <option value="status">Status</option>
        </select>

        {/* Add status filter dropdown */}
        <select className='select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Filter by status</option>
          <option value="Submitted">Submitted</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Batch update */}
        <div className='batch-update'>
          <h4>Batch update selected jobs' statuses:</h4>
          <select id="batchStatusUpdate" name="batchStatusUpdate">
            <option value="">Select new status</option>
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleBatchUpdate}>Batch Update</button>
        </div>
        {/* List the jobs */}
        {jobs.map((job) => (
          <Job key={job._id} job={job} handleArchive={handleArchive} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        ))}
      </div>
    );
};
  
export default JobsList;
  


  