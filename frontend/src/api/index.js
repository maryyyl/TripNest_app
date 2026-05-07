import api from './axios'

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
    login: (data) => api.post('/api/auth/login', data),
    register: (data) => api.post('/api/auth/register', data),
}

// ── Gastronomija ──────────────────────────────────────────────────────────────
export const gastronomyApi = {
    getAll: () => api.get('/api/gastronomy'),
    getById: (id) => api.get(`/api/gastronomy/${id}`),
    search: (query) => api.get('/api/gastronomy/search', { params: { query } }),
    getByTagovi: (tagovi) => api.get('/api/gastronomy/tagovi', { params: { tagovi } }),
    getByLokacija: (lokacija) => api.get(`/api/gastronomy/lokacija/${lokacija}`),
    getByStatus: (status) => api.get(`/api/gastronomy/status/${status}`),
    getSliki: (id) => api.get(`/api/gastronomy/${id}/sliki`),
}

// ── Atrakcii ──────────────────────────────────────────────────────────────────
export const attractionApi = {
    getAll: () => api.get('/api/attractions'),
    getById: (id) => api.get(`/api/attractions/${id}`),
    search: (query) => api.get('/api/attractions/search', { params: { query } }),
    getByTagovi: (tagovi) => api.get('/api/attractions/tagovi', { params: { tagovi } }),
    getByLokacija: (lokacija) => api.get(`/api/attractions/lokacija/${lokacija}`),
    getByCena: (min, max) => api.get('/api/attractions/cena', { params: { min, max } }),
    getSliki: (id) => api.get(`/api/attractions/${id}/sliki`),
}

// ── Smestuvanja ───────────────────────────────────────────────────────────────
export const accommodationApi = {
    getAll: () => api.get('/api/accommodations'),
    getById: (id) => api.get(`/api/accommodations/${id}`),
    search: (query) => api.get('/api/accommodations/search', { params: { query } }),
    getByTagovi: (tagovi) => api.get('/api/accommodations/tagovi', { params: { tagovi } }),
    getByLokacija: (lokacija) => api.get(`/api/accommodations/lokacija/${lokacija}`),
    getByCena: (min, max) => api.get('/api/accommodations/cena', { params: { min, max } }),
    create: (data) => api.post('/api/accommodations', data),
    update: (id, data) => api.put(`/api/accommodations/${id}`, data),
    delete: (id) => api.delete(`/api/accommodations/${id}`),
    getSliki: (id) => api.get(`/api/accommodations/${id}/sliki`),
}

// ── Reservations ──────────────────────────────────────────────────────────────
export const reservationApi = {
    create: (data) => api.post('/api/reservations', data),
    myReservations: () => api.get('/api/reservations/my'),
    getAll: () => api.get('/api/reservations'),
    getByStatus: (status) => api.get(`/api/reservations/status/${status}`),
    updateStatus: (id, status) => api.put(`/api/reservations/${id}/status`, null, { params: { status } }),
    delete: (id) => api.delete(`/api/reservations/${id}`),
    getBookedDates: (accommodationId) => api.get(`/api/reservations/booked-dates/${accommodationId}`),
}

// ── Accommodation Requests ────────────────────────────────────────────────────
export const accommodationRequestApi = {
    create: (data) => api.post('/api/accommodation-requests', data),
    myRequests: () => api.get('/api/accommodation-requests/my'),
    getAll: () => api.get('/api/accommodation-requests'),
    getByStatus: (status) => api.get(`/api/accommodation-requests/status/${status}`),
    approve: (id) => api.post(`/api/accommodation-requests/${id}/approve`),
    reject: (id) => api.post(`/api/accommodation-requests/${id}/reject`),
}

export const reviewApi = {
    getAll: (accommodationId) => api.get(`/api/accommodations/${accommodationId}/reviews`),
    getAvg: (accommodationId) => api.get(`/api/accommodations/${accommodationId}/reviews/avg`),
    create: (accommodationId, data) => api.post(`/api/accommodations/${accommodationId}/reviews`, data),
    delete: (accommodationId, reviewId) => api.delete(`/api/accommodations/${accommodationId}/reviews/${reviewId}`),
}
// ── Latest Reviews ────────────────────────────────────────────────────────────
export const latestReviewsApi = {
    get: (limit = 6) => api.get('/api/reviews/latest', { params: { limit } }),
}