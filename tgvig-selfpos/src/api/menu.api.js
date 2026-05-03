import API from "./axios";

// WEB MENU (simple)
export const getMenu = (clubId) => {
  return API.get(`/menu/${clubId}`);
};

// POS / SELF POS / DEVICE MENU
export const getMenuByDevice = (clubId, deviceId, type) => {
  return API.get(
    `/menu/device?clubId=${clubId}&deviceId=${deviceId}&type=${type}`
  );
};