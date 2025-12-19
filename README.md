# 🏥 Hospital Management System - Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

**A modern, responsive web application for comprehensive hospital operations management**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [API](#-api-documentation)

</div>

---

## 📋 Overview

The Hospital Management System Frontend is a modern, full-featured web application designed to streamline hospital operations. Built with React 18 and styled with a bold Neo-Brutalism design aesthetic, this platform provides an intuitive interface for managing patients, doctors, appointments, and hospital resources in real-time.

### ✨ Why This Project?

- **Complete Hospital Operations**: Manage every aspect from patient admissions to bed availability
- **Real-time Updates**: Live statistics and instant data synchronization
- **Modern UX**: Neo-brutalism design with bold colors, heavy shadows, and playful interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Production Ready**: Deployed on Vercel with backend on Render and PostgreSQL on Neon

---

## 🎯 Features

### 📊 Dashboard
- **Real-time Statistics**: Total patients, admitted patients, available doctors, and bed occupancy
- **Quick Overview**: Recent appointments and system-wide metrics at a glance
- **Visual Analytics**: Color-coded stat cards with bold neo-brutalist design

### 👥 Patient Management
- **Complete CRUD Operations**: Create, read, update, and delete patient records
- **Patient Admissions**: Admit patients and automatically allocate beds
- **Discharge Workflow**: Track discharge status and free up resources
- **Detailed Records**: Store age, gender, contact info, height, weight, and medical history
- **Search & Filter**: Quickly find patient records

### 👨‍⚕️ Doctor Management
- **Doctor Profiles**: Manage doctor information, specializations, and qualifications
- **Availability Tracking**: Real-time doctor availability status
- **Specialization Filtering**: Filter doctors by medical specialty
- **Shift Management**: Track doctor schedules and working hours
- **Quick Toggle**: Enable/disable doctor availability with one click

### 📅 Appointment Scheduling
- **Smart Scheduling**: Book appointments between patients and available doctors
- **Status Management**: Track appointment status (Scheduled, Completed, Cancelled)
- **Date & Time Tracking**: Full appointment datetime management
- **Patient/Doctor Filtering**: View appointments by patient or doctor
- **Appointment History**: Complete audit trail of all appointments

### 🛏️ Bed Management
- **Real-time Availability**: Live tracking of bed occupancy across all wards
- **Ward Management**: Organize beds by ward (ICU, General, Emergency, Pediatric, etc.)
- **Bed Allocation**: Automatically allocate beds during patient admission
- **Release Tracking**: Free up beds when patients are discharged
- **Occupancy Statistics**: View bed utilization rates by ward

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | Modern UI library with hooks and concurrent features |
| **React Router v6** | Client-side routing and navigation |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework for custom neo-brutalist design |
| **Axios** | Promise-based HTTP client for API requests |
| **Lucide React** | Beautiful, consistent icon library |
| **date-fns** | Modern date utility library |

### Backend & Database
| Technology | Hosting |
|-----------|----------|
| **Spring Boot** (Java) | Render.com |
| **PostgreSQL** | Neon (Serverless Postgres) |
| **REST API** | RESTful architecture |

### Deployment & DevOps
- **Frontend**: Vercel (CI/CD, global CDN, automatic deployments)
- **Backend**: Render (container-based deployment)
- **Database**: Neon (serverless PostgreSQL with autoscaling)
- **Version Control**: Git & GitHub

---

## 🎨 Design Philosophy

This application showcases a **Neo-Brutalism** design aesthetic characterized by:

### Visual Elements
- ✅ **Bold Borders**: 4-8px solid black borders on every element
- ✅ **Hard Shadows**: Pure offset shadows with no blur (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- ✅ **Vibrant Colors**: Cyan, yellow, pink, lime, orange, and purple from Tailwind palette
- ✅ **Heavy Typography**: Bold and black font weights throughout
- ✅ **Geometric Layouts**: Grid-based, structured component arrangement
- ✅ **High Contrast**: Maximum readability with strong color differentiation

### Interactive Design
- 🎭 **Playful Animations**: Shadow translation on hover for depth
- 🎭 **Tactile Feedback**: Button presses with shadow reduction
- 🎭 **Uppercase Headers**: All-caps text with letter spacing for emphasis
- 🎭 **Color-Coded Sections**: Each module has its signature color

### Accessibility
- ♿ **High Contrast Ratios**: WCAG AAA compliant color combinations
- ♿ **Clear Typography**: Readable fonts at all sizes
- ♿ **Responsive Design**: Mobile-first approach with breakpoints

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Running Backend Server** (see backend repository for setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hms-frontend.git
   cd hms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # For local development, create .env.development (already configured)
   VITE_API_URL=/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |

---

## ⚙️ Configuration

### Environment Variables

The application uses Vite's environment variable system with the `VITE_` prefix.

#### Development (`.env.development`)
```bash
# Uses Vite proxy to forward to backend
VITE_API_URL=/api
```

#### Production (`.env.production`)
```bash
# Points to deployed backend on Render
VITE_API_URL=https://hms-backend-bbl7.onrender.com
```

### Vite Configuration

The `vite.config.js` includes:
- **Dev Server**: Runs on port 3000
- **API Proxy**: Forwards `/api/*` requests to `http://localhost:8080` in development
- **React Plugin**: Fast Refresh and JSX transformation

---

## 🌐 Deployment

This project is production-ready and deployed across three platforms:

### Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│                 │      │                  │      │                 │
│  Vercel         │─────▶│  Render          │─────▶│  Neon           │
│  (Frontend)     │      │  (Backend API)   │      │  (PostgreSQL)   │
│                 │      │                  │      │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
     React App              Spring Boot              Serverless DB
```

### Frontend Deployment (Vercel)

#### Option 1: Vercel CLI (Recommended for first-time deployment)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Project** (when prompted):
   - Set up and deploy: **Yes**
   - Which scope: Select your account
   - Link to existing project: **No**
   - Project name: `hms-frontend` (or your choice)
   - Directory: `./` (current directory)
   - Override settings: **No**

5. **Add Environment Variable** (in Vercel Dashboard):
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://hms-backend-bbl7.onrender.com`
   - Select: Production, Preview, Development
   - Save and redeploy

#### Option 2: Vercel Dashboard (Git Integration)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click **"New Project"**
   - Import your GitHub repository

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variable**
   - Key: `VITE_API_URL`
   - Value: `https://hms-backend-bbl7.onrender.com`
   - Apply to: Production, Preview, Development

5. **Deploy**
   - Click **"Deploy"**
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Backend Deployment (Render)

Backend is already deployed on Render at:
```
https://hms-backend-bbl7.onrender.com
```

**Important**: Ensure CORS is configured to allow requests from your Vercel domain:
```java
// In Spring Boot application
@CrossOrigin(origins = {"https://your-app.vercel.app", "http://localhost:3000"})
```

### Database (Neon PostgreSQL)

PostgreSQL database is hosted on Neon (serverless Postgres). Ensure:
- Backend has correct `DATABASE_URL` in Render environment variables
- Connection pooling is configured
- SSL mode is enabled for secure connections

---

## 📂 Project Structure

```
hms-frontend/
├── public/
│   └── hospital-icon.svg          # Neo-brutalist favicon
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── Navbar.jsx            # Top navigation bar
│   │   ├── Modal.jsx             # Reusable modal component
│   │   ├── StatCard.jsx          # Dashboard statistics card
│   │   └── LoadingSpinner.jsx    # Loading indicator
│   ├── pages/                     # Route-level page components
│   │   ├── Dashboard.jsx         # Main dashboard with stats
│   │   ├── Patients.jsx          # Patient management page
│   │   ├── Doctors.jsx           # Doctor management page
│   │   ├── Appointments.jsx      # Appointment scheduling page
│   │   └── Beds.jsx              # Bed availability page
│   ├── services/                  # API integration layer
│   │   └── api.js                # Axios config + API endpoints
│   ├── styles/                    # Global styles
│   │   └── index.css             # Tailwind imports + custom CSS
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx                   # React root + entry point
├── .env.development               # Dev environment variables
├── .env.production                # Production environment variables
├── .env.example                   # Environment template
├── index.html                     # HTML entry point
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind customization
├── postcss.config.js              # PostCSS plugins
├── vercel.json                    # Vercel deployment config
└── README.md                      # This file
```

---

## 📡 API Documentation

### Base Configuration

```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

### API Endpoints

#### Patient Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patients` | Get all patients |
| GET | `/patients/{id}` | Get patient by ID |
| GET | `/patients/admitted` | Get all admitted patients |
| POST | `/patients` | Create new patient |
| PUT | `/patients/{id}` | Update patient |
| PATCH | `/patients/{id}/admit?bedNumber={bed}` | Admit patient |
| PATCH | `/patients/{id}/discharge` | Discharge patient |
| DELETE | `/patients/{id}` | Delete patient |

#### Doctor Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctors` | Get all doctors |
| GET | `/doctors/{id}` | Get doctor by ID |
| GET | `/doctors/available` | Get available doctors |
| GET | `/doctors/specialization/{spec}` | Get by specialization |
| POST | `/doctors` | Create new doctor |
| PUT | `/doctors/{id}` | Update doctor |
| PATCH | `/doctors/{id}/toggle-availability` | Toggle availability |
| DELETE | `/doctors/{id}` | Delete doctor |

#### Appointment Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/appointments` | Get all appointments |
| GET | `/appointments/{id}` | Get appointment by ID |
| GET | `/appointments/patient/{patientId}` | Get by patient |
| GET | `/appointments/doctor/{doctorId}` | Get by doctor |
| POST | `/appointments?doctorId={id}&patientId={id}` | Create appointment |
| PATCH | `/appointments/{id}/status?status={status}` | Update status |
| DELETE | `/appointments/{id}` | Delete appointment |

#### Bed Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/beds` | Get all beds |
| GET | `/beds/available` | Get available beds |
| GET | `/beds/available/ward/{wardName}` | Get available by ward |
| GET | `/beds/stats` | Get overall statistics |
| GET | `/beds/stats/ward/{wardName}` | Get ward statistics |
| POST | `/beds` | Create new bed |
| POST | `/beds/allocate?bedNumber={bed}&patientId={id}` | Allocate bed |
| POST | `/beds/release?bedNumber={bed}` | Release bed |

### Example API Calls

```javascript
// Get all patients
import { patientAPI } from './services/api';

const patients = await patientAPI.getAll();

// Create new doctor
import { doctorAPI } from './services/api';

await doctorAPI.create({
  name: "Dr. Sarah Johnson",
  specialization: "Cardiology",
  qualification: "MD, FACC",
  available: true,
  shift: "Morning"
});

// Schedule appointment
import { appointmentAPI } from './services/api';

await appointmentAPI.create(doctorId, patientId, {
  appointmentDateTime: "2024-12-25T10:00:00",
  status: "SCHEDULED"
});
```

---

## 🔧 Development

### Code Style

This project follows:
- **ES6+ JavaScript**: Modern syntax with arrow functions, destructuring, etc.
- **Functional Components**: React hooks instead of class components
- **Component Organization**: Separate components, pages, and services
- **CSS Utility Classes**: Tailwind CSS for styling

### Key Dependencies

```json
{
  "react": "^18.2.0",              // UI library
  "react-dom": "^18.2.0",          // React DOM renderer
  "react-router-dom": "^6.20.0",   // Routing
  "axios": "^1.6.2",               // HTTP client
  "lucide-react": "^0.294.0",      // Icons
  "date-fns": "^2.30.0"            // Date utilities
}
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code patterns
   - Use Tailwind classes for styling
   - Keep components focused and reusable

3. **Test Locally**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Build**
   ```bash
   npm run preview
   ```

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

---

## 🐛 Troubleshooting

### Common Issues

#### API Connection Failed
**Problem**: Can't connect to backend API

**Solutions**:
1. Check backend is running and accessible
2. Verify `VITE_API_URL` environment variable is set correctly
3. Check CORS configuration on backend
4. Inspect Network tab in browser DevTools

#### Build Errors
**Problem**: Build fails with module errors

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run build
```

#### Vercel Deployment Issues
**Problem**: Deployment succeeds but app doesn't work

**Solutions**:
1. Ensure `VITE_API_URL` is set in Vercel dashboard
2. Check environment variable is applied to correct environments
3. Trigger new deployment after setting variables
4. Check build logs for errors

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and patterns
- Write clear commit messages
- Update documentation for new features
- Test thoroughly before submitting PR
- Keep PRs focused on a single feature/fix

---

## 📄 License

This project is part of the Hospital Management System. All rights reserved.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Vite Team** - For lightning-fast build tooling
- **Tailwind Labs** - For the utility-first CSS framework
- **Lucide Icons** - For beautiful, consistent icons
- **Vercel** - For seamless deployment and hosting
- **Render** - For reliable backend hosting
- **Neon** - For serverless PostgreSQL

---

<div align="center">

**Built using React, Vite, and Neo-Brutalism Design, Solely to act as a frontend to my more extensive Java-Springboot based Backend experiment**
Check it out if you can! 

[Backend](https://github.com/varshith2101/Hospital-Management-System)

Made by Varshith Jalla (Almost a Software Developer)

[⬆ Back to Top](#-hospital-management-system---frontend)

</div>

