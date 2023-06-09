// Imports
import React from 'react';
import '../style/Job.css'; 
import { Link } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';

// Define the Job component. This component will represent a single job in the list.
// Defining a Job component that takes a job as a prop and displays its description, location, and priority.
// Add selectedJobs and setSelectedJobs to the props that this component receives
const Job = ({ job, selectedJobs, setSelectedJobs }) => {

  // function to handle the archive button click
  const handleArchive = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/archive/${job._id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        console.error('Failed to archive job');
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  return (
    <div className="job">
      <h3>Description: {job.description}</h3>
      <p>Location: {job.location}</p>
      <p>Priority: {job.priority}</p>
      <p>Status: {job.status}</p>
      <input
        type="checkbox"
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedJobs([...selectedJobs, job._id]);
          } else {
            setSelectedJobs(selectedJobs.filter((j) => j !== job._id));
          }
        }}
      />
      <Link className='edit-button' to={`/edit/${job._id}`}>Edit</Link>
      <button onClick={handleArchive}>Archive</button>
    </div>
  );
};

export default Job;
