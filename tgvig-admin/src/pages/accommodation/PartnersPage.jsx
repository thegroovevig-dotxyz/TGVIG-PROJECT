import { useEffect, useState } from "react";
import API from "../../services/api";

function PartnersPage() {

  const [partners, setPartners] = useState([]);

  useEffect(() => {

    API.get("/partners")
      .then((res) => {
        setPartners(res.data.partners || res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setPartners([]);
      });

  }, []);

  return (
    <div>
      <h1>🤝 Partners</h1>

      {partners.map((partner) => (
        <div key={partner._id}>
          <p>{partner.businessName}</p>
        </div>
      ))}
    </div>
  );
}

export default PartnersPage;