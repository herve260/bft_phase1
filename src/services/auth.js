import api from "./api.js";

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  localStorage.setItem("bft_access_token", data.data.accessToken);
  return data.data;
}

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  localStorage.setItem("bft_access_token", data.data.accessToken);
  return data.data;
}

export async function logout() {
  try { await api.post("/auth/logout"); } finally { localStorage.removeItem("bft_access_token"); }
}

export async function currentUser() {
  const { data } = await api.get("/auth/me");
  return data.data;
}
