import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import HomePage from '../pages/HomePage';
import EventDetailPage from '../pages/EventDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyEventsPage from '../pages/organizer/MyEventsPage';
import CreateEventPage from '../pages/organizer/CreateEventPage';
import EditEventPage from '../pages/organizer/EditEventPage';
import MyRegistrationsPage from '../pages/attendee/MyRegistrationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/organizer/my-events" element={<MyEventsPage />} />
          <Route path="/organizer/events/new" element={<CreateEventPage />} />
          <Route path="/organizer/events/:id/edit" element={<EditEventPage />} />
          <Route path="/attendee/my-registrations" element={<MyRegistrationsPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
