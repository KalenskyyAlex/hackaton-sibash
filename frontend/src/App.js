import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarForm from './components/CarForm';
import Download from './components/Download';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarForm />} />
        <Route path="/car-form-function" element={<CarForm />} />
        <Route path="/download" element={<Download/>} />
      </Routes>
    </Router>
  );
}

export default App;
