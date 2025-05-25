import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';

function PrivateRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log('PrivateRoutes isAuthenticated:', isAuthenticated); // Debug

  return (
    <Routes>
      <Route
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default PrivateRoutes;