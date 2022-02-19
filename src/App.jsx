import React from 'react';
import { Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { MetronomePage, TunerPage } from './pages';
import './App.css';

export const App = () => {
  return (
    <div className='app'>
      <NavBar />
      <div className='app__content'>
        <Routes>
          <Route exact path="/" element={<MetronomePage />} />
          <Route exact path="/tuner" element={<TunerPage />} />
        </Routes>
      </div>
    </div>
  );
};
