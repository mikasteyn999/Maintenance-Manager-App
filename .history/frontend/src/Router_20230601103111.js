// Import necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import JobForm from './components/JobForm';
import JobsList from './components/JobsList';
import JobUpdateForm from './components/JobUpdateForm'

// Define the Router component
// This component defines the routes for the React app
// The Home component (which contains both the JobForm and JobsList components) is displayed when the path is exactly "/"
// The JobForm component is displayed when the path is "/submit"
// The JobsList component is displayed when the path is "/jobs"
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home route */}
                <Route path="/submit" element={<JobForm />} /> {/* Job submission route */}
                <Route path="/jobs" element={<JobsList />} /> {/* Jobs listing route */}
                <Route path="/edit/:id" element={<JobUpdateForm />} />
            </Routes>
        </Router>
    );
};

// Export the Router component
export default AppRouter;
