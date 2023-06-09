# Maintenance Manager App

This Maintenance Manager App is a simple and intuitive web application to manage and track job submissions. It is built using React for the frontend, Node.js and Express for the backend API, and MongoDB as the database.

## Features

- Listing of jobs with their details.
- Creation of new jobs.
- Edit existing jobs.
- Filter jobs by status.
- Sort jobs by submission date or status.
- Batch update job statuses.
- Archive jobs.

## How to Use

### Prerequisites

Before you begin, you need to have Node.js and MongoDB installed on your machine. If you haven't installed them yet, you can download Node.js from [here](https://nodejs.org/) and MongoDB from [here](https://www.mongodb.com/try/download/community).

### Installation

1. Clone the repository to your local machine.
    ```
    git clone <repository-url> (to be added still)
    ```

2. Install the necessary dependencies for the server.
    ```
    cd server
    npm install
    ```

3. Install the necessary dependencies for the client.
    ```
    cd client
    npm install
    ```

### Running the App

1. Start the MongoDB service on your machine. The method to start MongoDB service will depend on your machine's operating system.

2. Start the server.
    ```
    cd server
    npm start
    ```

3. Start the client.
    ```
    cd client
    npm start
    ```

4. Open a browser and go to `http://localhost:3000`.

### Using the App

- **Add a New Job**: Fill in the form with job description, location, and priority, then click the 'Submit' button.

- **Edit a Job**: Click on the 'Edit' button on the job card, modify the details in the form, and then click 'Save'.

- **Archive a Job**: Click on the 'Archive' button on the job card to remove the job from the list.

- **Filter Jobs**: Select a status from the 'Filter by status' dropdown to see only the jobs with that status.

- **Sort Jobs**: Select a criteria from the 'Sort by' dropdown to sort the jobs either by date or status.

- **Batch Update**: Select the jobs that you want to update by checking the box on the job card, select the new status from the dropdown, and click the 'Batch Update' button.


## License

Mika Steyn
