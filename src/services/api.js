import axios from 'axios';

// Use environment variable or fallback to /api for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// key : value pairs for different API services
// "RequestName" : (params) => {api.METHOD('endpoint', data)}

// Patient API
export const patientAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  getAdmitted: () => api.get('/patients/admitted'),
  create: (patient) => api.post('/patients', patient),
  update: (id, patient) => api.put(`/patients/${id}`, patient),
  admit: (id, bedNumber) => api.patch(`/patients/${id}/admit?bedNumber=${bedNumber}`),
  discharge: (id) => api.patch(`/patients/${id}/discharge`),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Doctor API
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailable: () => api.get('/doctors/available'),
  getBySpecialization: (specialization) => api.get(`/doctors/specialization/${specialization}`),
  getAvailableBySpecialization: (specialization) =>
    api.get(`/doctors/available/specialization/${specialization}`),
  create: (doctor) => api.post('/doctors', doctor),
  update: (id, doctor) => api.put(`/doctors/${id}`, doctor),
  toggleAvailability: (id) => api.patch(`/doctors/${id}/toggle-availability`),
  delete: (id) => api.delete(`/doctors/${id}`),
};

// Appointment API
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  getByPatient: (patientId) => api.get(`/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
  create: (doctorId, patientId, appointment) =>
    api.post(`/appointments?doctorId=${doctorId}&patientId=${patientId}`, appointment),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status?status=${status}`),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// Bed Availability API
export const bedAPI = {
  getAll: () => api.get('/beds'),
  getAvailable: () => api.get('/beds/available'),
  getAvailableByWard: (wardName) => api.get(`/beds/available/ward/${wardName}`),
  getStats: () => api.get('/beds/stats'),
  getStatsByWard: (wardName) => api.get(`/beds/stats/ward/${wardName}`),
  create: (bed) => api.post('/beds', bed),
  allocate: (bedNumber, patientId) =>
    api.post(`/beds/allocate?bedNumber=${bedNumber}&patientId=${patientId}`),
  release: (bedNumber) => api.post(`/beds/release?bedNumber=${bedNumber}`),
};

export default api;
