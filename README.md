# Central OS

## Overview
Central OS is a life planning project built with Django (backend), React (frontend), and PostgreSQL (database).

## Features
- **Authentication**: Login and Signup with Email Verification (via Django Allauth)
- **Life Planning**: Define quarters of the year and set goals for each quarter
- **Beautiful Design**: Material UI-based interface with clean, user-friendly design
- **Docker Support**: Fully containerized with Docker Compose (PostgreSQL + Django + React)

## Project Structure
```
Central-OS-V2/
├── central_os_backend/         # Django project
│   ├── accounts/               # User authentication app
│   ├── planning/               # Life planning app (quarters & goals)
│   ├── central_os_backend/     # Project settings
│   └── manage.py
├── central_os_frontend/        # React frontend
│   ├── src/
│   │   ├── App.tsx             # Main React app (Login, Signup, Dashboard)
│   │   └── index.tsx           # Entry point
│   └── package.json
├── Dockerfile.backend          # Django Dockerfile
├── Dockerfile.frontend         # React Dockerfile
├── docker-compose.yml          # Docker Compose configuration
├── requirements.txt            # Python dependencies
└── venv/                       # Python virtual environment (for local dev)
```

## Running with Docker (Recommended)
1. **Build and Run**:
   ```bash
   docker-compose up --build
   ```
2. **Access**:
   - **Backend API**: http://localhost:8000/api
   - **Frontend Website**: http://localhost:3000
   - **PostgreSQL**: Port 5432 (User: postgres, Password: password, DB: central_os)

## Running Locally (Sandbox/Development)
1. **Backend**:
   ```bash
   source venv/bin/activate
   python manage.py runserver
   ```
2. **Frontend**:
   ```bash
   cd central_os_frontend
   npm start
   ```

## Database Configuration (Docker)
The `docker-compose.yml` automatically configures PostgreSQL:
- Host: `db`
- Name: `central_os`
- User: `postgres`
- Password: `password`

## Features
- **Authentication**: Login and Signup with Email Verification (via Django Allauth)
- **Life Planning**: Define quarters of the year and set goals for each quarter
- **Beautiful Design**: Material UI-based interface with clean, user-friendly design

## API Endpoints
- `/api/auth/api/register/` - User registration
- `/api/auth/api/login/` - User login
- `/api/auth/api/logout/` - User logout
- `/api/planning/api/quarters/` - List/create quarters
- `/api/planning/api/goals/` - List/create goals

## Next Steps
- Add PostgreSQL database setup (already in Docker Compose)
- Implement email verification service (SMTP)
- Add goal progress tracking
- Enhance dashboard with charts and visualizations
- Add quarterly planning templates
- Implement user profile management
