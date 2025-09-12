# AOT (Aid On Time) - Doctor Appointment System

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/MrAnsif/AOT)

## Description

AOT (Aid On Time) is a full-stack doctor appointment system built with the MERN stack. It allows patients to book and manage appointments with ease, while doctors can track schedules and patient info via a secure dashboard — ensuring healthcare is just a click away.

## Features and Functionality

*   **Patient Appointment Booking:** Allows patients to view available doctors and book appointments.
*   **Doctor Dashboards:** Provides doctors with an interface to manage appointments, view patient data, and update their profiles.
*   **Admin Control Panel:** Enables administrators to manage doctors, appointments, and system settings.
*   **User Authentication:** Secure login and registration for patients, doctors, and administrators.
*   **Real-time Availability:** Doctors can set their availability status.
*   **Appointment Management:** Patients and doctors can cancel or complete appointments.
*   **Medical History:** Doctors can add and view patient medical history.
*   **Payment Integration:** Razorpay integration for online payments.
*   **Chatbot Integration:** AI powered chatbot to answer user questions.

## Technology Stack

*   **Frontend:** React.js, Tailwind CSS, Framer Motion, React Router, Workbox
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Tokens)
*   **Image Hosting:** Cloudinary
*   **Payment Gateway:** Razorpay
*   **AI Chatbot:** Gemini API

## Prerequisites

Before running the application, ensure you have the following installed:

*   Node.js (v18 or higher)
*   npm (Node Package Manager)
*   MongoDB
*   Cloudinary account (for image storage)
*   Razorpay account (for payment processing)
*   Gemini API key (for Chatbot)

## Installation Instructions

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/MrAnsif/AOT.git
    cd AOT
    ```

2.  **Install Dependencies:**

    *   **Frontend:**

        ```bash
        cd frontend
        npm install
        ```

    *   **Admin:**

        ```bash
        cd admin
        npm install
        ```

    *   **Backend:**

        ```bash
        cd backend
        npm install
        ```

3.  **Configuration:**

    *   **Backend:**
        *   Create a `.env` file in the `backend` directory.
        *   Add the following environment variables:

            ```
            PORT=4000
            MONGODB_URI=<Your MongoDB Connection String>
            CLOUDINARY_NAME=<Your Cloudinary Cloud Name>
            CLOUDINARY_API_KEY=<Your Cloudinary API Key>
            CLOUDINARY_SECRET_KEY=<Your Cloudinary Secret Key>
            JWT_SECRET=<Your JWT Secret>
            ADMIN_EMAIL=<Your Admin Email>
            ADMIN_PASSWORD=<Your Admin Password>
            RAZORPAY_KEY_ID=<Your Razorpay Key ID>
            RAZORPAY_KEY_SECRET=<Your Razorpay Secret Key>
            CURRENCY=INR
            GEMINI_API_KEY=<Your Gemini API key>
            ```

    *   **Frontend:**
        *   Create a `.env` file in the `frontend` directory.
        *   Add the following environment variable:

            ```
            VITE_BACKEND_URL=http://localhost:4000
            ```

    *    **Admin:**
        *   Create a `.env` file in the `admin` directory.
        *   Add the following environment variable:

            ```
            VITE_BACKEND_URL=http://localhost:4000
            ```

4.  **Start the Application:**

    *   **Backend:**

        ```bash
        cd backend
        npm start
        ```

    *   **Frontend:**

        ```bash
        cd frontend
        npm run dev
        ```
     *   **Admin:**

        ```bash
        cd admin
        npm run dev
        ```

## Usage Guide

1.  **Access the Application:**
    *   Frontend: Open your web browser and go to `http://localhost:5173`.
    *   Admin: Open your web browser and go to `http://localhost:5174`.

2.  **User Registration/Login:**
    *   Patients can register and log in through the frontend interface `/login`.
    *   Admin and Doctors use the same login page as well.

3.  **Booking Appointments (Patient):**
    *   Browse available doctors.
    *   Select a doctor and choose an available date and time slot.
    *   Confirm the appointment.

4.  **Managing Appointments (Doctor):**
    *   Log in to the doctor dashboard.
    *   View scheduled appointments and patient details.
    *   Complete or cancel appointments.
    *   Add Medical history to the patient.

5.  **Admin Panel:**
    *   Log in to the admin panel.
    *   Add, remove, or modify doctor accounts.
    *   View and manage appointments.
    *   Cancel Appointments.

## API Documentation

The backend provides RESTful APIs for various functionalities. Here are some key endpoints:

### User Authentication

*   `POST /api/user/register`: Registers a new user.
    *   Request body: `{ name, email, password }`
    *   Response: `{ success, token, message }`

*   `POST /api/user/login`: Logs in an existing user.
    *   Request body: `{ email, password }`
    *   Response: `{ success, token, message }`

### Doctor Authentication
*   `POST /api/doctor/login`: Logs in an existing doctor.
    *   Request body: `{ email, password }`
    *   Response: `{ success, token, message }`
### Admin Authentication

*   `POST /api/admin/login`: Logs in an admin.
    *   Request body: `{ email, password }`
    *   Response: `{ success, token, message }`

### Appointment Management

*   `POST /api/user/book-appointment`: Books an appointment.
    *   Headers: `{ token }`
    *   Request body: `{ docId, slotDate, slotTime, homeConsultancy }`
    *   Response: `{ success, message }`

*   `GET /api/user/appointments`: Lists appointments for a user.
    *   Headers: `{ token }`
    *   Response: `{ success, appointments }`

*   `POST /api/user/cancel-appointment`: Cancels an appointment.
    *   Headers: `{ token }`
    *   Request body: `{ appointmentId }`
    *   Response: `{ success, message }`

### Doctor Dashboard

*   `GET /api/doctor/appointments`: Lists appointments for a doctor.
    *   Headers: `{ dtoken }`
    *   Response: `{ success, appointments }`

*   `POST /api/doctor/complete-appointment`: Marks an appointment as complete.
    *   Headers: `{ dtoken }`
    *   Request body: `{ appointmentId }`
    *   Response: `{ success, message }`

### Admin Panel
*   `POST /api/admin/add-doctor`: Adds a doctor in admin panel.
    *   Headers: `{ aToken }`
    *   Request body: `{ name, email, password, speciality, degree, experience, about, fees, address }`
    *   Response: `{ success, message }`
*   `GET /api/admin/appointments`: Lists appointments for admin panel.
    *   Headers: `{ aToken }`
    *   Response: `{ success, appointments }`
*   `GET /api/admin/dashboard`: Lists data for dashboard.
    *   Headers: `{ aToken }`
    *   Response: `{ success, dashData }`

See the individual route files in `backend/routes` for a complete list of API endpoints.

## Contributing Guidelines

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License Information

This project has no specified license. All rights are reserved unless explicitly granted.

## Contact/Support Information

*   **GitHub Repository:** [https://github.com/MrAnsif/AOT](https://github.com/MrAnsif/AOT)
*   **Developer:** MrAnsif

Feel free to reach out with any questions, suggestions, or issues.