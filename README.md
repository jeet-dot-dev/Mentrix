# Mentrix
Mentrix is a futuristic Metaverse Classroom platform where users can create and join immersive 3D rooms for collaborative learning experiences. Designed for the next generation of education.

## Project Structure

```
Mentrix/
├── .git/                    # Git repository
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
├── backend/                 # Backend API (TypeScript)
│   ├── dist/                # Compiled TypeScript output
│   ├── node_modules/        # Backend dependencies
│   ├── src/                 # Backend source code
│   │   ├── config/          # Configuration files
│   │   ├── controller/      # API controllers
│   │   ├── routes/          # API routes
│   │   ├── app.ts           # Express application setup
│   │   └── index.ts         # Entry point
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies and scripts
│   ├── package-lock.json    # Dependency lock file
│   └── tsconfig.json        # TypeScript configuration
├── frontend/                # Frontend application (TypeScript + React)
│   ├── node_modules/        # Frontend dependencies
│   ├── public/              # Static assets
│   ├── src/                 # Frontend source code
│   │   ├── components/      # Reusable UI components
│   │   ├── config/          # Configuration files
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   ├── main.tsx         # Application entry point
│   │   └── vite-env.d.ts    # Vite environment types
│   ├── .gitignore           # Git ignore file
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html           # HTML entry point
│   ├── package.json         # Frontend dependencies and scripts
│   ├── package-lock.json    # Dependency lock file
│   ├── postcss.config.js    # PostCSS configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── tsconfig.app.json    # TypeScript app configuration
│   ├── tsconfig.json        # TypeScript configuration
│   ├── tsconfig.node.json   # TypeScript node configuration
│   └── vite.config.ts       # Vite configuration
├── Metaverse/               # 3D Metaverse application (React)
│   ├── node_modules/        # Metaverse dependencies
│   ├── public/              # Static assets
│   ├── src/                 # Metaverse source code
│   │   ├── assets/          # Images, textures, and other media
│   │   ├── comps/           # React components
│   │   │   ├── EnvironmentComp.jsx  # Main 3D environment component
│   │   │   ├── Home.jsx             # Home page component
│   │   │   ├── Room.jsx             # Room component
│   │   │   ├── SceneContent .jsx    # Scene content component
│   │   │   └── YouTube.jsx          # YouTube video display component
│   │   ├── models/          # 3D models and character components
│   │   │   ├── Classroom.jsx    # Classroom model
│   │   │   ├── Sir.jsx          # Teacher model
│   │   │   ├── Student1.jsx     # Student character model 1
│   │   │   ├── Student2.jsx     # Student character model 2
│   │   │   └── Student3.jsx     # Student character model 3
│   │   ├── utils/           # Utility functions
│   │   │   ├── roomUtils.js     # Room-related utilities
│   │   │   └── socketUtils.js   # Socket.io utilities
│   │   ├── App.css          # Main application styles
│   │   ├── App.jsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # Application entry point
│   ├── .gitignore           # Git ignore file
│   ├── eslint.config.js     # ESLint configuration
│   ├── index.html           # HTML entry point
│   ├── package.json         # Metaverse dependencies and scripts
│   ├── package-lock.json    # Dependency lock file
│   └── vite.config.js       # Vite configuration
└── server/                  # Socket.io server (Node.js)
    ├── node_modules/        # Server dependencies
    ├── package.json         # Server dependencies and scripts
    ├── package-lock.json    # Dependency lock file
    └── server.js            # Socket.io server implementation
```

## Features

- 3D virtual classroom environment
- Real-time multiplayer interaction via Socket.io
- First-person and third-person camera views
- YouTube video integration for educational content
- Character customization
- Day/night cycle
- RESTful API for user management and room creation

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Metaverse Setup
1. Navigate to the Metaverse directory:
   ```
   cd Metaverse
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Socket.io Server Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Metaverse**: React, Three.js, React Three Fiber
- **Real-time Communication**: Socket.io
- **Database**: MongoDB (via backend)
