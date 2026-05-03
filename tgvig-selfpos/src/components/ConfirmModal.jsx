function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          margin: "100px auto",
          width: "300px",
          textAlign: "center",
        }}
      >
        <p>{message}</p>

        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmModal;