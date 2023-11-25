# SaaSstartup

## Description

SaaSstartup is a web application developed with Nest.js for the backend and Angular for the frontend. It is a Software as a Service (SaaS) startup platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
   - [Backend](#backend)
   - [Frontend](#frontend)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Contributing](#contributing)
6. [License](#license)

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your machine:

- Node.js and npm
- Angular CLI
- Nest.js CLI
- Postgressql (or your preferred database)

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/amadhashmi/SaaSstartup.git
   cd SaaSstartup/api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database connection in `backend/src/config/database.config.ts`.

4. Run the application:
   ```bash
   npm run start
   ```

### Frontend

1. In a new terminal window, navigate to the frontend directory:

   ```bash
   cd SaaSstartup/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/` to view the Angular app.

## Usage

- Access the Nest.js API at `http://localhost:3000/`.
- Access the Angular app at `http://localhost:4200/`.

## Configuration

- Backend configuration can be found in `backend/src/config`.
- Frontend configuration can be found in `frontend/src/environments`.

## User Interface

![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/dashboard.png)
![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/login.png)
![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/register.png)

## Deployment Explanation

![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/backend.drawio.png)
![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/frontend.png)
![Preview](https://github.com/AmadHashmi/SaaSstartup/blob/master/frontend/src/assets/images/github_pages_deployment.PNG)
