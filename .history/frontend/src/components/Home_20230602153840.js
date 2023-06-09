// Import necessary components
import React from 'react';
import JobForm from './JobForm';
import JobsList from './JobsList';

// Define the Home component
// This component contains the job submission form and job listings
const Home = () => {
  return (
    <div className="home">
      <JobForm /> {/* Job submission form */}
      <JobsList /> {/* Job listings */}
    </div>
  );
}

// Export the Home component
export default Home;
