import { useEffect, useState } from "react";
import API from "../api/axios";

export default function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await API.get("/settings");
      setSettings(res.data);
    } catch (err) {
      console.log("Settings load failed", err);
    }
  };

  return settings;
}