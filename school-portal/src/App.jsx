import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
              <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
              <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
              <Route path="/students" element={<PrivateRoute roles={['admin', 'teacher']}><Students /></PrivateRoute>} />
              <Route path="/teachers" element={<PrivateRoute roles={['admin']}><Teachers /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;