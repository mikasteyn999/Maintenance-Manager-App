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
  
    useEffect(() => {
      const fetchJobs = async () => {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data);
      };
      fetchJobs();
    }, []);
  
    return (
      <div className="jobs-list">
        <div className='jobs-header'>JOBS:</div>
        {jobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    );
  };
  
  export default JobsList;
  


  