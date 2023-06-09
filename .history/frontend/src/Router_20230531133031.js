// Import react & components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobForm from './components/JobForm';
import JobsList from './components/JobsList';

// Define the Router component. This component will define the routes for the React app.
// Using the BrowserRouter and Route components from react-router-dom.
// The JobsList component is displayed when the path is exactly "/".
// The JobForm component is displayed when the path is "/submit".
const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<JobsList />} />
          <Route path="/submit" element={<JobForm />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  

