import API from "./axios";

export const getEvents = () => API.get("/events");

export const createEvent = (data) =>
  API.post("/events", data);

export const buyEvent = (data) =>
  API.post("/events/buy", data);