# Library Management System

A modern Library Management System built with React, Vite, and Tailwind CSS. The project provides a clean dashboard for managing books, users, library activity, and basic catalog operations using client-side state and local storage.

## Overview

This application is designed as a frontend library management dashboard. It includes a responsive interface, book catalog browsing, user/member pages, reports, settings, authentication screens, and library statistics.

The project uses mock data and browser `localStorage`, so it can run without a backend server or database.

## Features

- Dashboard with total books, available books, issued books, and registered user statistics
- Book catalog with search and category filtering
- Add, edit, and delete book records
- Book availability tracking
- Issue and return book flow through library context state
- User/member listing
- Reports and settings pages
- Login and registration UI
- Light and dark theme support
- Toast notifications for user actions
- Responsive design for desktop and mobile screens

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Hook Form
- React Hot Toast
- Lucide React Icons
- date-fns
- UUID

## Project Structure

```text
library-management/
|-- public/
|-- src/
|   |-- assets/              # Images and static assets
|   |-- components/          # Reusable UI and feature components
|   |-- context/             # Auth, theme, and library state providers
|   |-- data/                # Mock books, users, and transactions
|   |-- hooks/               # Custom React hooks
|   |-- layouts/             # Application layouts and navigation
|   |-- pages/               # Main application pages
|   |-- routes/              # Route-related files
|   |-- services/            # Service helper files
|   |-- utils/               # Utility and validation helpers
|   |-- App.jsx              # Main app routing and providers
|   `-- main.jsx             # React entry point
|-- package.json
|-- tailwind.config.js
|-- vite.config.js
`-- README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/library-management.git
```

2. Go to the project folder:

```bash
cd library-management
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production-ready build in the `dist` folder.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint to check code quality.

## Data Storage

This project currently stores library data in the browser using `localStorage`.

The default books, users, and transactions are loaded from:

```text
src/data/mockData.js
```

Because this is a frontend-only project, data is stored locally in the browser. Clearing browser storage will reset saved changes.

## Main Pages

- `/` - Dashboard
- `/books` - Book catalog
- `/books/:id/edit` - Edit book details
- `/users` - Users and members
- `/profile` - Profile page
- `/reports` - Reports page
- `/settings` - Settings page
- `/login` - Login and registration page

## Future Improvements

- Connect the app to a backend API
- Add database support
- Add role-based authentication
- Add book borrowing history per user
- Add advanced reports and export options
- Add image upload support for book covers

## Author

Harsha

## License

This project is open source and available for learning, portfolio, and academic use.
