export const formatDate = (date) => date;

export const formatTime = (time) => time;

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || 'Something went wrong. Please try again.';

export const getValidationErrors = (error) => {
  const data = error.response?.data?.data;
  return data && typeof data === 'object' ? data : null;
};
