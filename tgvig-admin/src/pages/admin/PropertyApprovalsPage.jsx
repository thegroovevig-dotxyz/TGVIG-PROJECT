import { useEffect, useState } from "react";
import api from "../../services/api";

function PropertyApprovalsPage() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {

    try {

      const res = API.get(
        "/properties/pending"
      );

      setProperties(res.data);

    } catch (err) {
      console.log(err);
    }
  };



  const approveProperty = async (id) => {

    try {

      API.post(
        "/admin/property/approve",
        { propertyId: id }
      );

      fetchProperties();

    } catch (err) {
      console.log(err);
    }
  };



  const rejectProperty = async (id) => {

    try {

      API.post(
        "/admin/property/reject",
        { propertyId: id }
      );

      fetchProperties();

    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>

      <h1>🏨 Property Approvals</h1>

      {properties.map((property) => (

        <div
          key={property._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{property.name}</h3>

          <p>
            {property.propertyType}
          </p>

          <button
            onClick={() =>
              approveProperty(property._id)
            }
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectProperty(property._id)
            }
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  );
}

export default PropertyApprovalsPage;