import api from './axios';

export const eventApi = {
  getAll: async ({ title, category, page = 0, size = 12, sort = 'date,asc' } = {}) => {
    const params = { page, size, sort };
    if (title) params.title = title;
    if (category) params.category = category;

    const response = await api.get('/events', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  getMyEvents: async ({ page = 0, size = 10, sort = 'date,asc' } = {}) => {
    const response = await api.get('/events/my-events', {
      params: { page, size, sort },
    });
    return response.data;
  },

  create: async (payload) => {
    const response = await api.post('/events', payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await api.put(`/events/${id}`, payload);
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

export const getMyEvents = (params) => eventApi.getMyEvents(params);

export const getEventById = (id) => eventApi.getById(id);

export const createEvent = (payload) => eventApi.create(payload);

export const updateEvent = (id, payload) => eventApi.update(id, payload);

export const deleteEvent = (id) => eventApi.remove(id);

export default eventApi;
