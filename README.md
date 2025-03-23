# Event Management Website


## Overview
This is a modern event management web application built using **Vite + React**, with authentication and database powered by **Supabase**. The application allows users to **sign up, log in, create, edit, and delete events**. The UI is designed with **Tailwind CSS**, and reusable components have been implemented for better scalability and maintainability.

## Features
- **User Authentication**: Sign up and log in using Supabase Auth.
- **Event Management**: Users can create, edit, and delete events.
- **Reusable Components**: Optimized for scalability and maintainability.
- **Tailwind CSS**: Clean and responsive UI design.
- **Fast Development**: Built with **Vite** for a seamless development experience.

## Tech Stack
- **Frontend**: React (with Vite)
- **Authentication & Database**: Supabase
- **Styling**: Tailwind CSS

## Installation & Setup

### Install Dependencies
```sh
npm install  # or yarn install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Project
```sh
npm run dev  # or yarn dev
```

## Usage
- **Sign Up / Log In**: Users can create an account or log in using Supabase Auth.
- **Manage Events**: Once logged in, users can create, edit, and delete their own events.
