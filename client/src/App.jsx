import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserHome from './pages/UserHome';
import EmployerDashboard from './pages/EmployerDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/user"
          element={
            <PrivateRoute requiredRole="user">
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/employer"
          element={
            <PrivateRoute requiredRole="employer">
              <EmployerDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App
