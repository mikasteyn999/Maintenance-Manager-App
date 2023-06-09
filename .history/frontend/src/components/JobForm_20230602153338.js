// Import React
import React, { useState } from 'react';
import '../style/JobForm.css'; // Import the CSS

// Define the JobForm component. This component will contain a form that allows users to submit a new job.
// The component has a local state, job, which is updated every time the user types in one of the form inputs.
// The handleChange function updates the job state.
// The handleSubmit function makes a POST request to the /jobs route to submit the new job.
const JobForm = (props) => {
    const [job, setJob] = useState({ description: '', location: '', priority: '' });
  
    const handleChange = (e) => {
      setJob({ ...job, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newJob = await response.json();
      console.log("New Job:", newJob);  // log new job
      props.addNewJob(newJob); // add the new job to the jobs list
    };
    
  
    return (
      <form className="job-form" onSubmit={handleSubmit}>
        <input type="text" name="description" value={job.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="location" value={job.location} onChange={handleChange} placeholder="Location" />
        <input type="text" name="priority" value={job.priority} onChange={handleChange} placeholder="Priority" />
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default JobForm;
