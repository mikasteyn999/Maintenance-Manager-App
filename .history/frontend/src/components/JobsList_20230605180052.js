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
  const [jobAdded, setJobAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
  const [batchUpdateMessage, setBatchUpdateMessage] = useState(''); // State for batch success message



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

  // Hide job added message after 2 seconds when a job is added
  useEffect(() => {
    if (jobAdded) {
      setTimeout(() => {
        setJobAdded(false);
      }, 2000); // 2000ms = 2s
    }
  }, [jobAdded]);

  // Update sort order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

    // Batch update function
    const handleBatchUpdate = async () => {
      const status = document.getElementById('batchStatusUpdate').value;
      if (!status) {
        console.error('No status selected for batch update');
        setErrorMessage('Please select a status for batch update');
        return;
      }
      if (selectedJobs.length === 0) {
        console.error('No jobs selected for batch update');
        setErrorMessage('Please select at least one job for batch update');
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
          setBatchUpdateMessage('Batch update successful!');
          setTimeout(() => setBatchUpdateMessage(''), 3000); // Clear message after 3 seconds
          setSelectedJobs([]); // Clear selected jobs after successful update
          setErrorMessage(''); // Clear the error message after successful update
          // fetch the jobs again
          fetchJobs();
        } else {
          console.error('Failed to batch update jobs');
          setErrorMessage('Failed to batch update jobs');
          setTimeout(() => setBatchUpdateMessage(''), 3000); // Clear message after 3 seconds
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
      console.log("addNewJob called with:", newJob);  // log input to addNewJob
      setJobs([newJob, ...jobs]);
      setJobAdded(true); // Display job added message
    };
    
  
    return (
      <div className='jobs-list'>

        {/* Display job added message */}
        {jobAdded && <p className='success-message'>Job added successfully!</p>} 

        {/* Add JobForm here */}
        <JobForm addNewJob={addNewJob} />
      <div className='select-container'>
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
      </div>

        {/* Batch update */}
        <div className='batch-update'>
          <h3>Batch update job statuses:</h3>
          <p>Tick all the boxes of the jobs you want to change the status of in the jobs list below.</p>
          <p>Then select the new status from the drop down box, and hit Batch Update.</p>
          <select id="batchStatusUpdate" name="batchStatusUpdate">
            <option value="">Select new status</option>
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleBatchUpdate}>Batch Update</button>
        </div>

        {/* Display success message */}
        {batchUpdateMessage && <p className="success-message">{batchUpdateMessage}</p>}
        
        {/* Display error message if there is one */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className='jobs-header'>JOBS LIST:</div>

        {/* List the jobs */}
        {jobs.map((job) => (
          <Job key={job._id} job={job} handleArchive={handleArchive} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        ))}
      </div>
    );
};
  
export default JobsList;
  


  