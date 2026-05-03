import { useEffect, useState } from "react";
import API from "../api/axios";

function Coupons() {
  const [coupons, setCoupons] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    discountType: "PERCENT",
    value: "",
    expiryDate: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
  try {
    const res = await API.get("/coupons");

    const data =
      res.data?.data ||
      res.data?.coupons ||
      res.data ||
      [];

    setCoupons(data);
  } catch (err) {
    console.log("COUPON LOAD ERROR:", err);
    setCoupons([]);
  }
};

  const create = async () => {
    await API.post("/coupons", form);
    setForm({
      title: "",
      description: "",
      discountType: "PERCENT",
      value: "",
      expiryDate: "",
    });
    load();
  };

  const remove = async (id) => {
    await API.delete(`/coupons/${id}`);
    load();
  };

  return (
    <div>
      <h2>🎟️ Coupon Manager</h2>

      {/* CREATE */}
      <input placeholder="Title"
        value={form.title}
        onChange={(e)=>setForm({...form,title:e.target.value})}
      />

      <input placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
      />

      <select
        value={form.discountType}
        onChange={(e)=>setForm({...form,discountType:e.target.value})}
      >
        <option value="PERCENT">%</option>
        <option value="FIXED">Fixed</option>
        <option value="FREE_ITEM">Free Item</option>
      </select>

      <input placeholder="Value"
        onChange={(e)=>setForm({...form,value:e.target.value})}
      />

      <input type="date"
        onChange={(e)=>setForm({...form,expiryDate:e.target.value})}
      />

      <button onClick={create}>Create Coupon</button>

      <hr />

      {/* LIST */}
      {coupons.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>{c.discountType} - {c.value}</p>

          {/* QR */}
          {c.qrCode && <img src={c.qrCode} width="100" />}

          <button onClick={() => remove(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Coupons;