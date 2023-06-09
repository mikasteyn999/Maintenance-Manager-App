// Import React
import React, { useState } from 'react';
import '../style/JobForm.css'; // Import the CSS

// Define the JobForm component. This component will contain a form that allows users to submit a new job.
// The component has a local state, job, which is updated every time the user types in one of the form inputs.
// The handleChange function updates the job state.
// The handleSubmit function makes a POST request to the /jobs route to submit the new job.
const JobForm = (props) => {
  const [job, setJob] = useState({ description: '', location: '', priority: '' });

  // Adding new state variable for error message.
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adding form validation. Check that all fields are filled and priority is a number.
    if (!job.description || !job.location || !job.priority) {
      setError('Please fill in all fields'); // Set error message
      return; // Stop the function
    }
    if (isNaN(job.priority)) {
      setError('Priority must be a number'); // Set error message
      return; // Stop the function
    }

    try {
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
      setError(''); // Clear the error message if the job was successfully added
    } catch (err) {
      setError('An error occurred when submitting the job'); // Set error message
    }
  };

  // In the return statement, a new paragraph is added to display any error messages
  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>} {/* Display error message if there is one */}
      <input type="text" name="description" value={job.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="location" value={job.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="priority" value={job.priority} onChange={handleChange} placeholder="Priority" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;
