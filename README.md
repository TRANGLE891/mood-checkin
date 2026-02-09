# Mood Check-In

A React-based mood tracking application that allows users to check in their emotional state, record diary notes, and analyze mood patterns over time.

## Features

- **Daily Mood Check-In**: Quick and easy mood tracking with visual mood selection
- **Mood Analytics**: View mood trends and patterns with interactive charts
- **Diary Notes**: Add detailed notes associated with mood check-ins
- **User Management**: Support for multiple users with personalized mood history
- **Responsive Design**: Built with React and styled for optimal user experience

## Pages

- **Check-In Page** (`/`): Main page for daily mood check-ins
- **Mood Page** (`/heart`): Browse and manage mood entries
- **Diary Note Page** (`/diary/:userMoodId`): View and edit detailed notes for specific mood entries
- **Mood Analytics Page** (`/mood-analytics`): Visualize mood trends and patterns using charts

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charting**: Recharts
- **Styling**: CSS

## Project Structure

```
src/
├── pages/              # Page components
│   ├── CheckinPage
│   ├── MoodPage
│   ├── DiaryNotePage
│   └── MoodAnalyticsPage
├── apis/               # API integration modules
│   ├── common.ts
│   ├── moods.ts
│   ├── users.ts
│   └── userMoods.ts
├── context/            # Global state management
│   ├── globalContext.tsx
│   └── GlobalContextProvider.tsx
├── types/              # TypeScript type definitions
│   ├── Mood.ts
│   ├── User.ts
│   └── UserMood.ts
└── styles/             # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the project for production:

```bash
npm run build
```

### Lint

Check code quality:

```bash
npm run lint
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## API Integration

The application communicates with a backend API through the following modules:

- `apis/moods.ts` - Mood-related endpoints
- `apis/users.ts` - User management endpoints
- `apis/userMoods.ts` - User mood tracking endpoints
- `apis/common.ts` - Shared API utilities

## State Management

Global state is managed through React Context API via `GlobalContextProvider`, which handles:

- User authentication and data
- Loading states
- Mood history and analytics data

## License

This project is part of the Ada initiative.
