import { useState, useEffect } from "react";
import API from "../api/axios";

function Notifications() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const defaultSettings = {
  notifications: {
    welcome: { subject: "", message: "" },
    receipt: { subject: "", message: "" },
    topup: { subject: "", message: "" },
    coupon: { subject: "", message: "" }
  }
};

  const load = async () => {
  try {
    const res = await API.get("/settings");

    const data = res.data;

    setSettings({
      ...defaultSettings,
      ...data,
      notifications: {
        ...defaultSettings.notifications,
        ...(data.notifications || {})
      }
    });

  } catch (err) {
    console.log(err);
    setSettings(defaultSettings);
  }
};

  const update = async () => {
    await API.put("/settings", settings);
    alert("Updated");
  };

  if (!settings?.notifications) {
    return <h3>Loading notifications...</h3>;
  }

  return (
    <div>
      <h2>📩 Notifications Templates</h2>

      {Object.keys(settings.notifications || {}).map((key) => (
        <div key={key} style={{ marginBottom: 20 }}>
          <h4>{key.toUpperCase()}</h4>

          <input
            placeholder="Subject"
            value={settings.notifications?.[key]?.subject || ""}
            onChange={(e) => {
              const updated = { ...settings };
              updated.notifications[key].subject = e.target.value;
              setSettings(updated);
            }}
          />

          <textarea
            placeholder="Message"
            value={settings.notifications?.[key]?.message || ""}
            onChange={(e) => {
              const updated = { ...settings };
              updated.notifications[key].message = e.target.value;
              setSettings(updated);
            }}
          />
        </div>
      ))}

      <button onClick={update}>Save Templates</button>
    </div>
  );
}

export default Notifications;