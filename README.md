
# Client App Documentation

This document provides an overview of the `client-app` repository for the URL Shortener project. It covers the project structure, setup instructions, and documentation for the main React components.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Main Components](#main-components)
- [Helpers](#helpers)
- [Build & Public Folders](#build--public-folders)

---

## Project Overview

The `client-app` is a React (TypeScript) frontend for the URL shortener service. It allows users to sign up, log in, shorten URLs, and view analytics for their shortened URLs.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000` by default.

---

## Project Structure

```
client-app/
  package.json
  tsconfig.json
  public/
    index.html
    ...
  src/
    App.tsx
    index.tsx
    components/
      Dashboard.tsx
      Form.tsx
      LoginModal.tsx
      SignupModal.tsx
    helpers/
      constants.ts
    ...
```

---

## Main Components

### 1. `components/Dashboard.tsx`
- Displays a table of all URLs created by the logged-in user.
- Shows the short URL, original URL, and visit count.
- Fetches user-specific URLs from the backend and displays analytics.

### 2. `components/Form.tsx`
- Provides a form for users to submit URLs to be shortened.
- Handles user input and communicates with the backend to create new short URLs.
- Exports the `User` type/interface used for authentication and dashboard.

### 3. `components/LoginModal.tsx`
- Modal dialog for user login.
- Handles user authentication and error display.

### 4. `components/SignupModal.tsx`
- Modal dialog for user registration.
- Handles new user sign-up and error display.

---

## Helpers

### `helpers/constants.ts`
- Contains constants such as the backend server URL used for API requests.

---

## Build & Public Folders

- **`build/`**: Contains the production build output (auto-generated after running `npm run build`).
- **`public/`**: Contains static assets and the main HTML template.

---

## License
MIT
