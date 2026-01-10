
# Not a Simple Todo App Frontend

This is the frontend for the Not a Simple Todo App, built with React, Vite, and Tailwind CSS.

## Features
- Modern React (with hooks and context)
- Authentication and protected routes
- Todo and Grocery management
- Responsive design with Tailwind CSS
- Animations with Framer Motion and GSAP

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1. Navigate to the `frontend` directory:
	```sh
	cd frontend
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running the App
To start the development server:
```sh
npm run dev
```
The app will be available at `http://localhost:5173` by default.

### Building for Production
To build the app for production:
```sh
npm run build
```
The output will be in the `dist` folder.

### Preview Production Build
To preview the production build locally:
```sh
npm run preview
```

## Environment Variables
If your app needs to connect to a backend API, create a `.env` file in the `frontend` directory and add your variables, for example:
```
VITE_API_URL=http://localhost:3000
```

## Linting
To run ESLint:
```sh
npm run lint
```

## Deployment
You can deploy the contents of the `dist` folder to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure
- `src/` - Main source code
- `src/pages/` - Page components (Home, Auth, Groceries, About)
- `src/components/` - Reusable UI components
- `src/context/` - React context (e.g., authentication)
- `src/api/` - Axios instance for API calls
- `src/utils/` - Utility functions

---
For backend setup, see the `../backend/README.md` file.
