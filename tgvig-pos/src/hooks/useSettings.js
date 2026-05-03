import { useEffect, useState } from "react";
import API from "../api/axios";

function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await API.get("/settings");
        setSettings(res.data);
      } catch (err) {
        console.log("Settings load failed", err);
      }
    };

    loadSettings();
  }, []);

  return settings;
}

export default useSettings;