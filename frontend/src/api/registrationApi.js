import axiosInstance from "./axios";

export const registerForEvent = async (eventId) => {
  const response = await axiosInstance.post(`/registrations/${eventId}`);
  return response.data;
};

export const cancelRegistration = async (eventId) => {
  const response = await axiosInstance.delete(`/registrations/${eventId}`);
  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await axiosInstance.get("/registrations/my");
  return response.data;
};
