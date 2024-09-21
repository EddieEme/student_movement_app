# School Management System

## Description
This project is a School Management System built with a Django REST Framework backend and a React frontend. It provides a platform for managing school-related data, including user authentication, student information, and school-specific details.

## Features
- User Authentication (Login/Logout)
- JWT-based authentication for API requests
- User profiles with school affiliations

## Technologies
### Backend
- Django
- Django REST Framework
- Simple JWT for token-based authentication

### Frontend
- React
- Axios for API calls

## Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

## Installation

### Backend Setup
1. Clone the repository:
   ```
   git clone git@github.com:EddieEme/student_movement_app.git
   cd student_movement_app
   ```

2. Set up a virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```
   python3 manage.py migrate
   ```

5. Create a superuser:
   ```
   python3 manage.py createsuperuser
   ```

6. Run the development server:
   ```
   python3 manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install -r requirements.txt
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage
- Access the Django admin interface at `http://localhost:8000/admin/`
- The React frontend will be available at `http://localhost:3000`
- Use the login component to authenticate users

## API Endpoints
- `/api/login/`: POST request for user authentication
- 

## Contact
Edison Emerenmu - edisonemeremnu@gmail,com

Tasie Ibiam - tasieibiam28@gmail.com

Project Link: https://eddieeme.github.io/student_movement_app/

## Acknowledgments
- Django REST Framework
- React
