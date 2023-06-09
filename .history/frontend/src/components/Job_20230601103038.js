// Import React
import React from 'react';
import '../style/Job.css';  // Import the CSS

// Define the Job component. This component will represent a single job in the list.
// Defining a Job component that takes a job as a prop and displays its description, location, and priority.
const Job = ({ job }) => {
    return (
      <div className="job">
        <h3>Description: {job.description}</h3>
        <p>Location: {job.location}</p>
        <p>Priority: {job.priority}</p>
        <Link to={`/edit/${job._id}`}>Edit</Link>
      </div>
    );
  };
  
  export default Job;