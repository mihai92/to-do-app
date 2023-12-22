import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/RouteComponents/Login';
import Register from './components/RouteComponents/Register';
import Home from './components/RouteComponents/Home';
import Messages from './components/RouteComponents/Messages'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Home"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Messages" element={<Messages/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;