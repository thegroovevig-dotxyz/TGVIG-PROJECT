import API from "../api/axios";

// individual named exports (still usable)
export const login = async ({ email, password }) => {
  const res = await API.post("/members/login", { email, password });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

export const register = async (data) => {
  const res = await API.post("/members/register", data);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// 🔥 ADD THIS WRAPPER (THIS FIXES YOUR ERROR)
export const authService = {
  login,
  register,
  logout,
  getUser,
  getToken,
};