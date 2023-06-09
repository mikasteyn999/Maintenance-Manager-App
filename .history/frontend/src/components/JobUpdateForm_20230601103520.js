import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/JobUpdateForm'

const JobUpdateForm = () => {
  const [job, setJob] = useState({ description: '', location: '', priority: '', status: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the job details when the component mounts
    const fetchJob = async () => {
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
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
      // Navigate back to the jobs list after successful update
      navigate('/');
    } else {
      console.error('Failed to update job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" value={job.description} onChange={handleChange} />
      <input type="text" name="location" value={job.location} onChange={handleChange} />
      <input type="text" name="priority" value={job.priority} onChange={handleChange} />
      <input type="text" name="status" value={job.status} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default JobUpdateForm;
