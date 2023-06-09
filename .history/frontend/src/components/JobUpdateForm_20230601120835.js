import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/JobUpdateForm.css'

const JobUpdateForm = () => {
  const [job, setJob] = useState({ description: '', location: '', priority: '', status: '' });
  const [error, setError] = useState(''); // For handling request failure
  const { id } = useParams(); // Get the job id from URL parameters
  const navigate = useNavigate(); // React Router navigate function for navigation

  useEffect(() => {
    // Fetch the job details when the component mounts
    const fetchJob = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${id}`);

          const data = await response.json();
          console.log('Fetched job:', data);
          if (response.ok) {
            setJob(data); // Update job state with fetched job data
          } else {
            setError('Failed to fetch job'); // If fetch request fails, set an error message
          }
        } catch (error) {
          console.error(error);
          setError(`An error occurred: ${error}`);
        }
      };
      
      
      
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    // Update the corresponding job field when its input changes
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (response.ok) {
      navigate('/'); // If the update request is successful, navigate back to the job list
    } else {
      setError('Failed to update job'); // If the update request fails, set an error message
    }
  };

  return (
    <form className='job-update-form' onSubmit={handleSubmit}>
      {/* Labels for the inputs for better accessibility */}
      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" value={job.description} onChange={handleChange} />

      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="location" value={job.location} onChange={handleChange} />

      <label htmlFor="priority">Priority</label>
      <input type="text" id="priority" name="priority" value={job.priority} onChange={handleChange} />

      <label htmlFor="status">Status</label>
      <input type="text" id="status" name="status" value={job.status} onChange={handleChange} />

      <button type="submit">Update</button>
      
      {/* Show error message if there is one */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default JobUpdateForm;
