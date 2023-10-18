import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/RouteComponents/Login';
import Register from './components/RouteComponents/Register';
import Dashboard from './components/RouteComponents/Dashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;