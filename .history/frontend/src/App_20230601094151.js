// Import necessary libraries and components
import React from 'react';
import Router from './Router';
import './style/App.css'

// Define the App component
// This component uses the Router component to handle routing
const App = () => {
  return (
    <div className="app">
      <h1 className="app-title">Welcome to the Maintenance Management App</h1> {/* Welcome title */}
      <p className="app-instructions">Here you can submit a job, update job information, and filter jobs by their status.</p> {/* Instructions */}
      <Router /> {/* Use Router component for handling routes */}
    </div>
  );
}

// Export the App component
export default App;
