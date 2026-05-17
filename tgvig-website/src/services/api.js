import axios from "axios";

// 🔥 BASE API CONFIG
const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/API"
      : "https://tgvig-project-backend.onrender.com/API",
});


// 🔐 ATTACH TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ⚠️ GLOBAL ERROR HANDLING (OPTIONAL BUT USEFUL)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized - redirect to login if needed");
    }

    return Promise.reject(err);
  }
);

export default API;