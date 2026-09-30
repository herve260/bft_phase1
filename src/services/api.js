import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bft_access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = null;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original?._retry || original?.url?.includes("/auth/refresh") || original?.url?.includes("/auth/login") || original?.url?.includes("/auth/register")) {
      return Promise.reject(error);
    }
    original._retry = true;
    refreshing ??= api.post("/auth/refresh").then(({ data }) => {
      localStorage.setItem("bft_access_token", data.data.accessToken);
      return data.data.accessToken;
    }).catch((refreshError) => {
      localStorage.removeItem("bft_access_token");
      throw refreshError;
    }).finally(() => { refreshing = null; });
    const token = await refreshing;
    original.headers.Authorization = `Bearer ${token}`;
    return api(original);
  }
);

export default api;
