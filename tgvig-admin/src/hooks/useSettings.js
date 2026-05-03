import { useEffect, useState } from "react";
import API from "../api/axios";

export default function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/settings");
      setSettings(res.data);
    };

    load();
  }, []);

  return settings;
}