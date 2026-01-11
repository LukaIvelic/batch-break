export const API_BASE_URL = process.env.API_ENDPOINT || "http://localhost:8000";

export const ENDPOINTS = {
  AUTH_ENDPOINT: {
    LOGIN: (email: string, password: string) =>
      `${API_BASE_URL}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  },
  USERS_ENDPOINT: {
    POST: `${API_BASE_URL}/users`,
    GET_ALL: `${API_BASE_URL}/users`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
    PATCH: (id: string) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/users/${id}`,
    FIND_BY_EMAIL: (email: string) =>
      `${API_BASE_URL}/users?email=${encodeURIComponent(email)}`,
    IS_IN_DATABASE: (email: string) =>
      `${API_BASE_URL}/users/exists?email=${encodeURIComponent(email)}`,
  },
};
