import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Habits from './pages/habits/Habits';
import DailyTasks from './pages/dailyTasks/DailyTasks';
import Goals from './pages/goals/Goals';
import Badges from './pages/profile/Badges';
import Rewards from './pages/rewards/Rewards';
import NotificationList from './pages/notifications/NotificationList';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/tasks" element={<DailyTasks />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/notifications" element={<NotificationList />} />
        </Route>
      </Routes>
    </Router>
  );
}
