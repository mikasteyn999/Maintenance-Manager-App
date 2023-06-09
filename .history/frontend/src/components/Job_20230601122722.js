// Import React
import React from 'react';
import '../style/Job.css';  // Import the CSS
import { Link } from 'react-router-dom';

// Define the Job component. This component will represent a single job in the list.
// Defining a Job component that takes a job as a prop and displays its description, location, and priority.
// Add selectedJobs and setSelectedJobs to the props that this component receives
const Job = ({ job, selectedJobs, setSelectedJobs }) => {
  return (
    <div className="job">
      <h3>Description: {job.description}</h3>
      <p>Location: {job.location}</p>
      <p>Priority: {job.priority}</p>
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
    </div>
  );
};

export default Job;
