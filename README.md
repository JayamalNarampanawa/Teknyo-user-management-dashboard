# Teknyo User Management Dashboard

A polished, responsive React dashboard built for the Teknyo internship practical assessment. The app integrates a live API, supports search and pagination, and includes a responsive layout with modal-based user details and dark mode.

# Live Demo

Live Demo: https://usermanagementdashboard-teknyo.netlify.app/users

## Features

- Responsive dashboard layout with sidebar navigation
- User listing from the JSONPlaceholder API
- Search users by name
- Pagination with 5 users per page
- Loading state and error handling
- View user details in a modal
- Dark mode toggle with persisted preference
- React Router-based navigation
- Reusable UI components

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## API Used

- https://jsonplaceholder.typicode.com/users

## Setup Instructions

1. Install dependencies.
2. Start the development server.
3. Open the app in your browser.

## Run Locally

```bash
npm install
npm run dev
```

If React Router is not installed in your local environment, run:

```bash
npm install react-router-dom
```

## Folder Structure

```text
src/
  components/
    ErrorState.jsx
    LoadingState.jsx
    Pagination.jsx
    SearchBar.jsx
    UserModal.jsx
    UserTable.jsx
  layouts/
    DashboardLayout.jsx
  pages/
    UserManagement.jsx
  services/
    userService.js
  App.jsx
  index.css
  main.jsx
```


## Submission Note

This project was implemented as a production-quality internship assessment submission with a focus on clean architecture, responsive UI, and maintainable React patterns.
