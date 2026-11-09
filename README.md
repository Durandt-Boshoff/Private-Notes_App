# Private Notes App

A full-stack personal notes application built with React, Tailwind CSS, Node.js, Express and Supabase. It allows users to securely create, manage, organise and store their personal notes.

## Overview

Private Notes App is designed to provide users with a simple, private space to manage their thoughts, ideas and information.

Users can register an account, log in securely and access a personalised dashboard where they can create, edit, favourite, archive and permanently delete notes.

The application uses Supabase Authentication, PostgreSQL and Row Level Security (RLS) to ensure that users can only access their own notes.

## Features

### Authentication
- User registration with email and password.
- Secure login and logout.
- Supabase Authentication.
- JWT-based authentication using HTTP-only cookies.
- Protected frontend routes.
- Express authentication middleware.

### Note Management
- Create new notes with a title and content.
- Edit existing notes.
- Choose custom background colours for notes.
- Favourite and unfavourite notes.
- Move notes to Trash.
- Restore notes from Trash.
- Permanently delete individual notes.
- Empty the Trash.

### Security
- Protected API endpoints.
- HTTP-only authentication cookies.
- Supabase Row Level Security (RLS).
- User-specific note access.
- Database relationships between notes and authenticated users.

## Technologies Used

| Category | Technology |
|---|---|
| Frontend | React |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Backend | Node.js |
| Server Framework | Express.js |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Security | JWT, HTTP-only cookies, RLS |
| Version Control | Git and GitHub |

## Project Structure

```text
Private-Notes_App/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── supabase.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

*The folder structure above represents the main application organisation. Additional files may exist in the project.*

## Getting Started

### Prerequisites

Before running the application, ensure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Private-Notes_App
```

### 2. Install Dependencies

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Install the backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with your Supabase project credentials.

Never commit environment files containing credentials to GitHub.

### 4. Configure Supabase

Create a Supabase project and configure the following:

1. Enable Supabase Authentication.
2. Configure email confirmation according to your authentication settings.
3. Create the `notes` table in PostgreSQL.
4. Enable Row Level Security (RLS).
5. Configure policies that restrict users to their own notes.
6. Configure the database timestamp update trigger.

The notes table uses the following fields:

| Column | Type | Description |
|---|---|---|
| id | UUID | Unique note identifier |
| user_id | UUID | Owner of the note |
| title | TEXT | Note title |
| content | TEXT | Note content |
| color | TEXT | Note background colour |
| is_favourite | BOOLEAN | Favourite status |
| is_trashed | BOOLEAN | Trash status |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last updated timestamp |

### 5. Run the Application

Start the backend using its configured development script:

```bash
cd backend
npm install
node server.js
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## API Documentation

The Express backend provides the following API endpoints.

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new account |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | Log out the authenticated user |
| GET | `/api/auth/me` | Verify the current session |

### Notes Routes

All notes endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Retrieve the authenticated user's notes |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Permanently delete a note |

The update endpoint supports changes to note titles, content, colours, favourite status and trash status.

## Security and Data Privacy

Security is an important part of this application.

- Supabase Auth handles user authentication.
- Authentication tokens are stored in HTTP-only cookies.
- Express middleware verifies authenticated requests.
- Supabase Row Level Security ensures users can only access their own notes.
- Notes are associated with their owner's authenticated user ID.
- Database records are protected through user-specific access policies.

## Future Improvements

Potential improvements include:

- Password reset functionality.
- Note search and filtering enhancements.
- Rich-text note editing.
- Note sorting and organisation.
- Additional personalisation options.

## Author

**Durandt Boshoff**

Software Development Student

## Project Purpose

This application was developed as part of the Melsoft Software Development course to demonstrate practical knowledge of full-stack web development, REST APIs, authentication, database management, CRUD operations and application security.

---

*Private Notes App | Built with React, Express and Supabase.*