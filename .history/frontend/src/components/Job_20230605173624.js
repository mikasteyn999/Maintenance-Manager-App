// Imports
import React from 'react';
import '../style/Job.css'; 
import { Link } from 'react-router-dom';

// Define the Job component
const Job = ({ job, handleArchive, selectedJobs, setSelectedJobs }) => {

  return (
    <div className="job">
      <h3>Description: {job.description}</h3>
      <p>Location: {job.location}</p>
      <p>Priority: {job.priority}</p>
      <p>Status: {job.status}</p>
      <input
        type="checkbox"
        checked={selectedJobs.includes(job._id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedJobs([...selectedJobs, job._id]);
          } else {
            setSelectedJobs(selectedJobs.filter((j) => j !== job._id));
          }
        }}
      />
      <Link className='edit-button' to={`/edit/${job._id}`}>Edit</Link>
      <button className='archive-button' onClick={() => handleArchive(job._id)}>Archive</button>
    </div>
  );
};

export default Job;
