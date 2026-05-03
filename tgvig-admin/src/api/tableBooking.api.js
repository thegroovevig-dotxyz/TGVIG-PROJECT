import API from "./axios";

export const getTableBookings = () => API.get("/table-bookings");

export const createTableBooking = (data) =>
  API.post("/table-bookings", data);