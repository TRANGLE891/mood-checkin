# mood-checkin
Repository for the mood checking project

## Project Structure

This repository contains two main folders:

### Frontend (React TypeScript)
- Location: `./frontend`
- Technology: React with TypeScript
- Package Manager: npm
- Description: Frontend application for the Mood Check-in system

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend application will run on `http://localhost:3000`

#### Frontend Scripts
- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite

### Backend (Java)
- Location: `./backend`
- Technology: Java with Spring Boot
- Build Tool: Maven
- Description: Backend REST API for the Mood Check-in system

#### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend application will run on `http://localhost:8080`

#### Backend Endpoints
- `GET /api/health` - Health check endpoint

## Development

### Prerequisites
- Node.js (v16 or higher) for Frontend
- Java 17 or higher for Backend
- Maven 3.6+ for Backend

### Running the Full Stack
1. Start the Backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. In a new terminal, start the Frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## License
ISC

