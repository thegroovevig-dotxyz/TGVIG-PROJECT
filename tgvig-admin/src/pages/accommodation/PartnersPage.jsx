import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

function PartnersPage() {

  const [partners, setPartners] = useState([]);

  useEffect(() => {

    API
      .get("/partners/")
      .then((res) => {
        setPartners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>🤝 Partners</h1>

      {partners.map((partner) => (
        <div
          key={partner._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{partner.businessName}</h3>

          <p>Status: {partner.approvalStatus}</p>
          <p>Type: {partner.businessType}</p>
        </div>
      ))}

    </div>
  );
}

export default PartnersPage;