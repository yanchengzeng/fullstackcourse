import React, { useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { AuthProvider, RequireAuth } from './components/authConfig.tsx';



function App() {
  console.log("loading the whole applications")
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/dashboard" element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                } />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Unknown />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

function Unknown() {
  return (
    <h2>
      Ups
    </h2>
  )
}

function Preferences() {
  return (
    <h2>Preferences</h2>
  );
}


export default App;