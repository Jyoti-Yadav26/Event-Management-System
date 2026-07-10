import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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
import { ROLES } from '../utils/constants';

const LegacyEditRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/organizer/edit/${id}`} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        {/* Organizer-only routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ORGANIZER]} />}>
          <Route path="/organizer/my-events" element={<MyEventsPage />} />
          <Route path="/organizer/create" element={<CreateEventPage />} />
          <Route path="/organizer/edit/:id" element={<EditEventPage />} />
        </Route>

        {/* Attendee-only routes */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ATTENDEE]} />}>
          <Route path="/attendee/my-registrations" element={<MyRegistrationsPage />} />
        </Route>

        {/* Legacy path redirects */}
        <Route path="/organizer/events/new" element={<Navigate to="/organizer/create" replace />} />
        <Route path="/organizer/events/:id/edit" element={<LegacyEditRedirect />} />
      </Route>

      {/* Guest-only auth routes */}
      <Route element={<AuthLayout />}>
        <Route element={<ProtectedRoute guestOnly />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
