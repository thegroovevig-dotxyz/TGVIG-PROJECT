import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function CardDesigner() {
  const [view, setView] = useState("front");
  const [selected, setSelected] = useState(null);

  const [frontBg, setFrontBg] = useState("");
  const [backBg, setBackBg] = useState("");
  const [bgColor, setBgColor] = useState("#111");

  // FRONT ELEMENTS
  const [frontText, setFrontText] = useState({
    name: "John Doe",
    memberNo: "TGVIG123",
    tier: "VIP",
    size: 16,
    pos: { x: 20, y: 20 },
  });

  // BACK ELEMENTS
  const [backText, setBackText] = useState({
    info: "Scan for Rewards",
    terms: "Valid Membership Card",
    size: 14,
    pos: { x: 20, y: 20 },
  });

  const [qrPos, setQrPos] = useState({ x: 240, y: 120 });
  const [qrSize, setQrSize] = useState(60);

  const move = (dx, dy) => {
    if (selected === "front") {
      setFrontText((p) => ({
        ...p,
        pos: { x: p.pos.x + dx, y: p.pos.y + dy },
      }));
    }

    if (selected === "back") {
      setBackText((p) => ({
        ...p,
        pos: { x: p.pos.x + dx, y: p.pos.y + dy },
      }));
    }

    if (selected === "qr") {
      setQrPos((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const bg = view === "front" ? frontBg : backBg;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      {/* CONTROL PANEL */}
      <div style={{ width: "320px" }}>
        <h3>🎴 CARD DESIGNER</h3>

        <button onClick={() => setView("front")}>Front</button>
        <button onClick={() => setView("back")}>Back</button>

        <hr />

        <p>Background Image</p>
        <input
          type="file"
          onChange={(e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            view === "front" ? setFrontBg(url) : setBackBg(url);
          }}
        />

        <p>Background Color</p>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />

        <hr />

        {/* FRONT TEXT EDIT */}
        {view === "front" && (
          <>
            <h4>FRONT TEXT</h4>

            <input
              placeholder="Name"
              value={frontText.name}
              onChange={(e) =>
                setFrontText({ ...frontText, name: e.target.value })
              }
            />

            <input
              placeholder="Member No"
              value={frontText.memberNo}
              onChange={(e) =>
                setFrontText({ ...frontText, memberNo: e.target.value })
              }
            />

            <input
              placeholder="Tier"
              value={frontText.tier}
              onChange={(e) =>
                setFrontText({ ...frontText, tier: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Font Size"
              value={frontText.size}
              onChange={(e) =>
                setFrontText({ ...frontText, size: Number(e.target.value) })
              }
            />
          </>
        )}

        {/* BACK TEXT EDIT */}
        {view === "back" && (
          <>
            <h4>BACK TEXT</h4>

            <input
              placeholder="Info"
              value={backText.info}
              onChange={(e) =>
                setBackText({ ...backText, info: e.target.value })
              }
            />

            <input
              placeholder="Terms"
              value={backText.terms}
              onChange={(e) =>
                setBackText({ ...backText, terms: e.target.value })
              }
            />

            <input
              type="number"
              value={backText.size}
              onChange={(e) =>
                setBackText({ ...backText, size: Number(e.target.value) })
              }
            />
          </>
        )}

        <hr />

        <h4>SELECT ELEMENT</h4>

        <button onClick={() => setSelected("front")}>Front Text</button>
        <button onClick={() => setSelected("back")}>Back Text</button>
        <button onClick={() => setSelected("qr")}>QR</button>

        <h4>MOVE SELECTED</h4>

        <button onClick={() => move(0, -10)}>Up</button>
        <button onClick={() => move(0, 10)}>Down</button>
        <button onClick={() => move(-10, 0)}>Left</button>
        <button onClick={() => move(10, 0)}>Right</button>

        {selected === "qr" && (
          <>
            <h4>QR SIZE</h4>
            <input
              type="range"
              min="30"
              max="150"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
            />
          </>
        )}
      </div>

      {/* CANVAS */}
      <div>
        <h4>{view.toUpperCase()} CARD</h4>

        <div
          style={{
            width: "350px",
            height: "200px",
            position: "relative",
            background: bgColor,
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          {/* BG IMAGE */}
          {bg && (
            <img
              src={bg}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}

          {/* FRONT TEXT */}
          {view === "front" && (
            <div
              onClick={() => setSelected("front")}
              style={{
                position: "absolute",
                left: frontText.pos.x,
                top: frontText.pos.y,
                color: "white",
                fontSize: frontText.size,
                cursor: "pointer",
              }}
            >
              <h3 style={{ margin: 0 }}>{frontText.name}</h3>
              <p style={{ margin: 0 }}>{frontText.memberNo}</p>
              <p style={{ margin: 0 }}>{frontText.tier}</p>
            </div>
          )}

          {/* BACK TEXT */}
          {view === "back" && (
            <div
              onClick={() => setSelected("back")}
              style={{
                position: "absolute",
                left: backText.pos.x,
                top: backText.pos.y,
                color: "white",
                fontSize: backText.size,
                cursor: "pointer",
              }}
            >
              <p>{backText.info}</p>
              <p>{backText.terms}</p>
            </div>
          )}

          {/* QR BACK ONLY */}
          {view === "back" && (
            <div
              onClick={() => setSelected("qr")}
              style={{
                position: "absolute",
                left: qrPos.x,
                top: qrPos.y,
                background: "white",
                padding: 5,
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              <QRCodeCanvas value={frontText.memberNo} size={qrSize} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDesigner;