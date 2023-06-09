//Import react & job component
import React, { useEffect, useState } from 'react';
import Job from './Job';
import '../style/JobsList.css';

// Define the JobsList component. This component will fetch a list of jobs from the server and display each one using the Job component.
// The component has a local state, jobs, which is an array of jobs.
// The useEffect hook is used to fetch the jobs when the component is first rendered.
// The fetchJobs function makes a GET request to the /jobs route to fetch the list of jobs.
// Each job is then displayed using the Job component.
const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [sortOrder, setSortOrder] = useState("date"); // Add state for sort order. By default, it's set to 'date'
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [filterStatus, setFilterStatus] = useState(""); // Add state for status filter

    useEffect(() => {
      const fetchJobs = async () => {
        let url = `http://localhost:5000/api/jobs?sort=${sortOrder}`; 
        if (filterStatus) url += `&status=${filterStatus}`; // Add status query parameter if a status filter is selected
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data);
      };
      fetchJobs();
    }, [sortOrder, filterStatus]); // Update useEffect dependencies to include filterStatus
  
    const handleSortChange = (event) => {
      setSortOrder(event.target.value); // When user selects a new sort order, update the sortOrder state
    };

    // Function for catch updates
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
        } else {
          console.error('Failed to batch update jobs');
        }
      } catch (error) {
        console.error(`An error occurred: ${error}`);
      }
    };
    

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
            <option value="">Completed</option>
          </select>
          <button onClick={handleBatchUpdate}>Batch Update</button>
        </div>
        {/* List the jobs */}
        {jobs.map((job) => (
          <Job key={job._id} job={job} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        ))}
      </div>
    );
};
  
export default JobsList;
  


  