import api from './axios';

export const registerForEvent = async (eventId) => {
  const response = await api.post(`/registrations/${eventId}`);
  return response.data;
};

export const cancelRegistration = async (eventId) => {
  const response = await api.delete(`/registrations/${eventId}`);
  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await api.get('/registrations/my-events');
  return response.data;
};
