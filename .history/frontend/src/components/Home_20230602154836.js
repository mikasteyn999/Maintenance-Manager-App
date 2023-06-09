// Import necessary components
import React from 'react';
import JobsList from './JobsList';

// Define the Home component
// This component contains the job submission form and job listings
const Home = () => {
  return (
    <div className="home">
      <JobsList /> {/* Job listings */}
    </div>
  );
}

// Export the Home component
export default Home;
