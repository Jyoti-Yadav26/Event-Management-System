import { ROLES } from './constants';

export const getRoleHomePath = (role) => {
  if (role === ROLES.ORGANIZER) return '/organizer/my-events';
  if (role === ROLES.ATTENDEE) return '/attendee/my-registrations';
  return '/';
};

const isOrganizerPath = (path) =>
  path === '/organizer/my-events'
  || path === '/organizer/create'
  || path.startsWith('/organizer/edit/');

const isAttendeePath = (path) => path === '/attendee/my-registrations';

export const getPostLoginPath = (role, fromPath) => {
  if (!fromPath || fromPath === '/login' || fromPath === '/register') {
    return getRoleHomePath(role);
  }

  if (fromPath.startsWith('/events/')) {
    return fromPath;
  }

  if (role === ROLES.ORGANIZER && isOrganizerPath(fromPath)) {
    return fromPath;
  }

  if (role === ROLES.ATTENDEE && isAttendeePath(fromPath)) {
    return fromPath;
  }

  return getRoleHomePath(role);
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateLong = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const value = new Date();
  value.setHours(Number(hours), Number(minutes));
  return value.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatCategoryLabel = (category) => {
  if (!category || category === 'All') return category;
  return category.charAt(0) + category.slice(1).toLowerCase();
};

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || 'Something went wrong. Please try again.';

export const getValidationErrors = (error) => {
  const data = error.response?.data?.data;
  return data && typeof data === 'object' ? data : null;
};
