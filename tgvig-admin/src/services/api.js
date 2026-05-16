import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/API"
      : "https://tgvig-project-backend.onrender.com/API",
});

export default API;