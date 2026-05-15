import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://tgvig-project-backend.onrender.com/api",
});

// 🔐 Attach token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🚨 GLOBAL ERROR HANDLER
api.interceptors.response.use(

  (response) => response,

  (error) => {

    // 🔐 AUTO LOGOUT IF TOKEN BAD
    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }

);

export default API;