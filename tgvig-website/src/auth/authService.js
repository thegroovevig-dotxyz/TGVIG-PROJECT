import API from "../api/axios";

// LOGIN
export const login = async ({ email, password }) => {
  const res = await API.post("/members/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// REGISTER
export const register = async (data) => {
  const res = await API.post("/members/register", data);
  return res.data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// GET USER
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// GET TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

export const authService = {
  login,
  register,
  logout,
  getUser,
  getToken,
};