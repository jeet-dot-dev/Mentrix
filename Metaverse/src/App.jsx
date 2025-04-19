// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './comps/Home';
import Room from './comps/Room';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;