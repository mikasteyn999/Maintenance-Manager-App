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

    useEffect(() => {
      const fetchJobs = async () => {
        const response = await fetch(`http://localhost:5000/api/jobs?sort=${sortOrder}`); // Update API call to include sort order
        const data = await response.json();
        setJobs(data);
      };
      fetchJobs();
    }, [sortOrder]); // Update useEffect dependency array to include sortOrder. This means the useEffect callback will run whenever sortOrder changes.
  
    const handleSortChange = (event) => {
      setSortOrder(event.target.value); // When user selects a new sort order, update the sortOrder state
    };

    return (
      <div className='jobs-list'>
        <div className='jobs-header'>JOBS:</div>
        
        <select id="batchStatusUpdate" name="batchStatusUpdate">
  <option value="">Select new status</option>
  <option value="status1">Status 1</option>
  <option value="status2">Status 2</option>
  // Add more options based on your job statuses
</select>

<button onClick={handleBatchUpdate}>Batch Update</button>

        <select className='select-sort' value={sortOrder} onChange={handleSortChange}> {/* Add select element for sort order */}
          <option value="date">Sort by submit date</option>
          <option value="status">Sort by status</option>
        </select>
        {jobs.map((job) => (
          <Job key={job._id} job={job} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        ))}
      </div>
    );
};
  
export default JobsList;
  


  