# AI Email Assistant

A full-stack application that uses an AI to generate and send emails. It features a clean, responsive interface with light and dark themes.


*(Note: Replace the line above with an actual screenshot of your project.)*

---

## Features

* AI Email Generation (Groq & LLaMA 3)
* Side-by-Side Editor Layout
* Light & Dark Theme Support
* Success Popup Notifications
* Responsive Design for Mobile

---

## Tech Stack

* **Frontend:** React, Axios
* **Backend:** Node.js, Express, Nodemailer

---

## How to Run

### 1. Backend Setup

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file as described in the section below and add your credentials.
4.  Start the server: `node server.js`
    *(The backend will run on `http://localhost:3001`)*

### 2. Frontend Setup

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the React application: `npm start`
    *(The frontend will open at `http://localhost:3000`)*

---

## Environment Variables

For the server to function, you must create a `.env` file inside the `/backend` directory. Add the following variables and replace the placeholder text with your actual credentials.

**File:** `backend/.env`