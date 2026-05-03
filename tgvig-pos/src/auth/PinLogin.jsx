import { useState } from "react";

function PinLogin({ onUnlock }) {
  const [pin, setPin] = useState("");

  const handlePin = (e) => {
    e.preventDefault();

    const storedPin = localStorage.getItem("pin");

    if (pin === storedPin) {
      onUnlock(true);
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <div>
      <h2>Enter POS PIN</h2>

      <form onSubmit={handlePin}>
        <input
          placeholder="4-digit PIN"
          onChange={(e) => setPin(e.target.value)}
        />

        <button type="submit">Unlock</button>
      </form>
    </div>
  );
}

export default PinLogin;