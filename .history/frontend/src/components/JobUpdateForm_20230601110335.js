import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/JobUpdateForm.css'

const JobUpdateForm = () => {
  const [job, setJob] = useState(null); // Initialize job state as null
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the job details when the component mounts
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`); // Fetch job by id
        const jobData = await response.json();
        if (response.ok) {
          setJob(jobData); // Update job state with fetched job data
        } else {
          console.error('Failed to fetch job');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return null; // Don't render component until job data has been fetched
  }

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (response.ok) {
        // Navigate back to the jobs list after successful update
        navigate('/');
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form className='job-update-form' onSubmit={handleSubmit}>
      <input type="text" name="description" value={job.description} onChange={handleChange} />
      <input type="text" name="location" value={job.location} onChange={handleChange} />
      <input type="text" name="priority" value={job.priority} onChange={handleChange} />
      <input type="text" name="status" value={job.status} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default JobUpdateForm;
