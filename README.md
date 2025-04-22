# Survey App

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) using **TypeScript**. It allows users to register/login, create custom surveys, view available surveys, and take them.

<div align="center">

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MartinNachev255/survey-app/blob/main/LICENSE)

### The app is hosted on: https://survey-app-3vcj.onrender.com/

![Survey App Screenshot](https://github.com/user-attachments/assets/38998614-02b0-4305-b900-c258b12006f1)

</div>

## Table of Contents

*   [Features](#features)
*   [Tech Stack](#tech-stack)
*   [Project Structure](#project-structure)
*   [Prerequisites](#prerequisites)
*   [Installation & Setup](#installation--setup)
*   [Running the Application](#running-the-application)
    *   [Using Docker Compose (Recommended)](#using-docker-compose-recommended)
    *   [Manual Setup (Without Docker)](#manual-setup-without-docker)
*   [Running Tests](#running-tests)
*   [Environment Variables](#environment-variables)
*   [Author](#author)
*   [License](#license)

## Features

*   User authentication (Register/Login)
*   Create custom surveys with closed questions
*   View a list of available surveys
*   Take surveys and submit responses
*   View survey results

## Tech Stack

*   **Core:** TypeScript, Node.js, MongoDB
*   **Frontend:** React.js, TypeScript, Material UI (MUI), React Router, Redux Toolkit, Axios
*   **Backend:** Express.js, MongoDB (with Mongoose ODM), Zod
*   **Authentication:** JWT (using `jsonwebtoken`)
*   **Testing:**
    *   Backend: Jest, Supertest
    *   E2E: Playwright
*   **Containerization:** Docker, Docker Compose
*   **CI/CD:** GitHub Actions (basic workflow setup)

## Project Structure

```plaintext
survey-app/
├── .github/workflows/   # GitHub Actions CI/CD configuration
├── e2e-tests/           # End-to-end tests using Playwright
├── survey-app-backend/  # Express.js API (TypeScript)
│   ├── src/             # Backend source code (controllers, services, models, etc.)
│   ├── tests/           # Backend unit/integration tests
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── survey-app-frontend/ # React.js client application (TypeScript + Vite)
│   ├── src/             # Frontend source code (components, hooks, services, etc.)
│   ├── tsconfig.json
│   └── package.json
├── .dockerignore
├── .gitignore
├── Dockerfile           # Builds the production Docker image
├── LICENSE
├── README.md
├── docker-compose.db.yml   # Docker Compose for local database
└── docker-compose.yml      # Docker Compose for running the application
```
## Prerequisites

*   **Node.js** and **npm** 
*   **Docker** & **Docker Compose**
*   **Git**

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MartinNachev255/survey-app.git
    cd survey-app
    ```
2.  **(Optional but Recommended for Manual Setup/Testing):** Create the backend environment file.
    *   Navigate to `survey-app-backend/`.
    *   Create an `.env` file.
    *   Fill in the necessary variables (see [Environment Variables](#-environment-variables) section).

## Running the Application

### Using Docker Compose (Recommended)

This is the simplest way to get the entire application (backend API, frontend served by backend, and database) running.

1.  Ensure Docker and Docker Compose are installed and running.

2.  From the **root directory** (`survey-app/`), build and start the services:
    ```bash
    # Use --build to create fresh images, including the latest frontend build
    docker-compose up --build -d
    ```
    *   The `-d` flag runs the containers in detached mode (in the background).

3.  Access the application in your browser. The application should be available on `http://localhost:5000` (check `docker-compose.yml` for the exact port mapping).

4.  **To view logs:**
    ```bash
    docker-compose logs -f
    ```

5.  **To stop the services:**
    ```bash
    docker-compose down
    ```
    *   Use `docker-compose down -v` to also remove the database volume if you want to start fresh.

### Manual Setup (Without Docker)

This method requires manually installing dependencies, building the frontend, and running the backend. A local MongoDB instance (or a cloud instance) is needed. Docker is still recommended for running the database locally easily.

0.  **Start MongoDB Database:**
    *   **Option A (Using Docker for DB only):** From the root directory, start the database service defined in `docker-compose-db.yml`:
        ```bash
        docker compose -f docker-compose-db.yml up -d
        ```
        *To stop and remove the database volume:*
        ```bash
        docker compose -f docker-compose-db.yml down -v
        ```
    *   **Option B (Other DB):** Ensure your MongoDB instance is running and accessible. Update the `MONGODB_URI_PROD` in `survey-app-backend/.env` accordingly.

1.  **Install Frontend Dependencies:**
    ```bash
    cd survey-app-frontend
    npm install
    ```

2.  **Build Frontend for Production:**
    ```bash
    # This creates the 'dist' folder
    npm run build
    ```

3.  **Copy Frontend Build to Backend:** The static files from `survey-app-frontend/dist` need to be served by the backend.
    ```bash
    # From the 'survey-app-frontend' directory
    # Adjust paths if necessary depending on your OS/shell
    rm -rf ../survey-app-backend/dist # Remove old build (optional)
    cp -r dist/ ../survey-app-backend/dist # Copy new build
    ```
    *Alternatively, configure the backend's `Dockerfile` or server setup if you prefer a different serving mechanism.*

4.  **Install Backend Dependencies:**
    ```bash
    cd ../survey-app-backend
    npm install
    ```

5.  **Setup Backend Environment Variables:**
    *   Ensure you have a `.env` file in `survey-app-backend/`.
    *   Define at least `MONGODB_URI_PROD` and `SECRET`. Example:
        ```dotenv
        # survey-app-backend/.env
        MONGODB_URI_PROD=mongodb://user:password@localhost:27017/survey-app?authSource=admin
        SECRET=your_strong_secret_key_here
        PORT=5000
        ```

6.  **Run the Backend Server:**
    *   From the `survey-app-backend/` directory:
        ```bash
        npm run start
        ```
    *   *(Alternative)* You can also pass environment variables directly (syntax varies by shell):
        *   **Linux/macOS (bash/zsh):**
            ```bash
            MONGODB_URI_PROD="mongodb://user:password@..." SECRET="your_secret" npm run start
            ```
        *   **Windows (CMD):**
            ```cmd
            set MONGODB_URI_PROD="mongodb://user:password@..." && set SECRET="your_secret" && npm run start
            ```
        *   **Windows (PowerShell):**
            ```powershell
            $env:MONGODB_URI_PROD="mongodb://user:password@..."; $env:SECRET="your_secret"; npm run start
            ```

7.  Access the application at `http://localhost:<PORT>` (Should be `http://localhost:3000` by default).

## Running Tests

Docker is required to provide a database environment for testing.

**Backend Tests (Jest/Supertest)**

1.  **Start Test Database:** From the root directory (`survey-app/`):
    ```bash
    docker compose -f docker-compose-db.yml up -d
    ```
2.  **Install Backend Dependencies (if not already done):**
    ```bash
    cd survey-app-backend
    npm install
    ```
3.  **Run Backend Tests:** In the `survey-app-backend/` directory:
    ```bash
    # Ensure .env has MONGODB_URI_DEV pointing to the test DB if needed by tests
    npm run test
    ```
4.  **Stop Test Database:** When finished, from the root directory:
    ```bash
    docker compose -f docker-compose-db.yml down -v # -v removes the volume
    ```

**End-to-End Tests (Playwright)**

1.  **Start Test Database:** (If not already running) From the root directory:
    ```bash
    docker compose -f docker-compose-db.yml up -d
    ```
2.  **Setup the Application:** Follow the [Manual Setup](#manual-setup-without-docker) steps 1-4 to build the frontend and install the backend dependencies.
3.  **Install E2E Test Dependencies:**
    ```bash
    cd ../e2e-tests # Navigate from survey-app-backend
    npm install
    ```
4.  **Install Playwright Browsers:** (One-time setup)
    ```bash
    # Installs browser binaries (Chromium, Firefox, WebKit) and OS dependencies
    npx playwright install --with-deps
    ```
5.  **Run E2E Tests:** In the `e2e-tests/` directory:
    ```bash
    # Ensure the application (frontend+backend+db) is running
    npm run test
    ```
6.  **Stop Test Database & Application:**
    *   Stop the backend server (Ctrl+C in its terminal).
    *   From the root directory, stop the database:
        ```bash
        docker compose -f docker-compose-db.yml down -v
        ```

## Environment Variables

The backend requires environment variables set in a `.env` file within the `survey-app-backend/` directory.

*   `MONGODB_URI_PROD`: **(Required)** Connection string for the MongoDB database used in production/manual setup.
    *   *Example (local Docker DB from `docker-compose-db.yml`):* `mongodb://user:password@localhost:27017/survey-app?authSource=admin`
*   `SECRET`: **(Required)** A strong, secret string used for signing JWT tokens.
*   `PORT`: (Optional) The port the backend server will listen on. Defaults to `3000` or as specified in the code.

## Author

*   **Martin Nachev** - [GitHub Profile](https://github.com/MartinNachev255)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
