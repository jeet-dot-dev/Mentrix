# Merntix (shortlisted for the offline round of Hack4Bengal Hackathon)
Merntix is a futuristic Metaverse Classroom platform where users can create and join immersive 3D rooms for collaborative learning experiences. Designed for the next generation of education.

## What Problems Does It Solve

- **Immersive Learning Environment**: Transforms traditional online education into an engaging 3D experience, increasing student attention and participation
- **Experiential Education**: Allows students to experience the future of education through virtual classroom interactions
- **Interactive Assessment**: Provides a dynamic environment for mock tests and assessments that surpass traditional online quiz formats
- **Distance Learning Barriers**: Breaks down geographical barriers while maintaining a sense of physical presence and community
- **Student Engagement**: Combats online learning fatigue through gamified educational experiences

## Project Structure

```
Merntix/
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
- First-person and third-person camera views
- YouTube video integration for educational content
- Character customization
- Day/night cycle
- RESTful API for user management and room creation


## 🚧 Challenges We Ran Into

- **First Time with Three.js & React Integration**  
  This was our first time exploring Three.js. We started by watching a few YouTube tutorials and then moved on to the official documentation. While we were able to grasp basic concepts, integrating Three.js into a React environment using `@react-three/fiber` turned out to be much more complex than expected. Managing components, reactivity, and scene updates required a lot of trial and error.

- **Finding the Right 3D Character & Classroom Model**  
  Choosing suitable 3D assets was another challenge. We initially used Mixamo for character animations and classroom models, but finding a balance between quality and compatibility took time and effort.

- **Using Blender for the First Time**  
  Blender was completely new to us. Importing, editing, and exporting models correctly for web use proved to be a steep learning curve. Simple tasks like adjusting poses or fixing animations became time-consuming.

- **Implementing WebSocket Rooms**  
  While we were already familiar with the basic concepts of WebSockets, using them in combination with a 3D environment was a first. Creating synchronized virtual rooms that multiple users could join and interact in required careful handling of socket events and scene updates.

- **MCQ Generation using Anthropic AI**  
  In the second phase of the project, we attempted to generate MCQs using Anthropic’s AI API. Integrating the API, formatting questions correctly, and handling edge cases was more difficult than anticipated.

- **Exporting Results to PDF**  
  Downloading user results as a PDF seemed like a minor feature at first, but involved a fair bit of complexity—especially in terms of layout design, formatting, and consistent rendering across browsers.

> There were several moments where we felt stuck and even considered giving up. But after pushing through all the hurdles, we’re proud to present the final product you see today.


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
  tsc -b
  node dist/index.js
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
- **Metaverse**: React, Three.js, React Three Fiber ,WebSockets

