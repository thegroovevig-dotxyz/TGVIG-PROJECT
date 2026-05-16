import { useEffect, useState } from "react";
import API from "../../services/api";

function PartnerApprovalsPage() {

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {

    try {

      const res = await API.get(
        "/admin/partners/"
      );

      setPartners(res.data);

    } catch (err) {
      console.log(err);
    }
  };



  const approvePartner = async (id) => {

    try {

      await API.post(
        "/admin/partner/approve",
        { partnerId: id }
      );

      fetchPartners();

    } catch (err) {
      console.log(err);
    }
  };



  const rejectPartner = async (id) => {

    try {

      await API.post(
        "/admin/partner/reject",
        { partnerId: id }
      );

      fetchPartners();

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>

      <h1>🤝 Partner Approvals</h1>

      {partners.map((partner) => (

        <div
          key={partner._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>
            {partner.businessName}
          </h3>

          <p>
            {partner.businessType}
          </p>

          <button
            onClick={() =>
              approvePartner(partner._id)
            }
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectPartner(partner._id)
            }
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  );
}

export default PartnerApprovalsPage;