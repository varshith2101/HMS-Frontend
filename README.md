# Hospital Management System - Frontend

A modern, responsive web application for managing hospital operations including patient management, doctor scheduling, appointments, and bed availability tracking.

## Features

- **Dashboard**: Real-time statistics and overview of hospital operations
- **Patient Management**: Complete CRUD operations for patient records with admission/discharge functionality
- **Doctor Management**: Manage doctor profiles, specializations, and availability
- **Appointment Scheduling**: Schedule and track patient-doctor appointments
- **Bed Availability**: Real-time bed tracking and allocation system

## Tech Stack

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (Neo-brutalism design)
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## Design

This application features a **Neo-Brutalism** design aesthetic with:
- Bold 4-8px black borders on all elements
- Hard box shadows (no blur, pure offset)
- Vibrant color palette (cyan, yellow, pink, lime, orange, purple)
- Heavy font weights (bold/black)
- Geometric shapes and layouts
- Playful hover animations with shadow translation
- Uppercase typography with tracking
- High contrast and accessibility

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running HMS backend server (default: http://localhost:8080)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Modal.jsx
│   │   ├── StatCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── Doctors.jsx
│   │   ├── Appointments.jsx
│   │   └── Beds.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── styles/          # CSS files
│   │   └── index.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Configuration

The frontend uses environment variables for API configuration.

### Local Development

For local development, the app uses Vite proxy (configured in `vite.config.js`) to forward API requests to `http://localhost:8080`.

### Production

Create a `.env.production` file or set environment variable:

```bash
VITE_API_URL=https://your-backend.railway.app/api
```

The API client (`src/services/api.js`) will automatically use this URL in production builds.

## Features Overview

### Dashboard
- Total patient count
- Admitted patients count
- Available doctors
- Available beds
- Recent appointments list
- Quick statistics

### Patient Management
- Add new patients
- Edit patient information
- Admit/discharge patients
- Delete patient records
- View patient details (age, gender, phone, height, weight)

### Doctor Management
- Add new doctors
- Edit doctor profiles
- Toggle doctor availability
- Filter by specialization
- Track doctor qualifications and shifts

### Appointment Scheduling
- Schedule new appointments
- View all appointments
- Update appointment status (Scheduled, Completed, Cancelled)
- Delete appointments
- Filter by patient or doctor

### Bed Management
- Add new beds
- Real-time bed availability tracking
- Allocate beds to patients
- Release beds
- View bed statistics by ward
- Track occupancy rates

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Deployment

This project is pre-configured for Vercel deployment with `vercel.json` for SPA routing.

### Quick Deploy to Vercel (Recommended)

#### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and set up your project
4. Add environment variable in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend-api.com/api`

#### Option 2: Using Vercel Dashboard

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-api.com/api`
6. Click "Deploy"

### What's Configured

- **vercel.json**: Handles SPA routing for React Router
  - All routes redirect to `/index.html`
  - API routes are preserved for future proxy configuration
  - Cache headers configured for API endpoints

- **.env.production**: Template for production environment variables
  - Set `VITE_API_URL` to your deployed backend URL in Vercel dashboard

### After Deployment

1. Get your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Configure CORS on your backend to allow requests from your Vercel domain
3. Test the application by visiting the Vercel URL

### Alternative Platforms

- **Netlify**: Similar to Vercel, great for React apps (may need `_redirects` file)
- **Railway**: Can host both frontend and backend
- **AWS Amplify**: AWS-native solution
- **Cloudflare Pages**: Fast global CDN

**Important:**
- Always set `VITE_API_URL` environment variable to your backend URL
- Ensure your backend has CORS configured with your frontend domain
- The `vercel.json` file ensures React Router works correctly in production

## License

This project is part of the Hospital Management System.
