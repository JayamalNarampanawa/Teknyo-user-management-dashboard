import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    // App-level routing keeps the dashboard layout stable while swapping page content.
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/users" replace />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}

export default App;