import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner({ onScan }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText); // membership number comes here
        scanner.clear();
      },
      (error) => {
        console.log(error);
      }
    );

    return () => scanner.clear();
  }, []);

  return <div id="reader" />;
}

export default Scanner;