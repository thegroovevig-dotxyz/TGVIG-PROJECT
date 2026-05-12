import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner({ onScan }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 200, height: 200 }, // SMALL CENTER QR BOX
    });

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
      }}
    >
      <div id="reader" style={{ width: "250px" }} />
    </div>
  );
}

export default Scanner;