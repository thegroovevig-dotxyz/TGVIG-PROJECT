import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

function PropertiesPage() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {

    API
      .get("/properties/")
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div>

      <h1>🏨 Properties</h1>

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

          <p>Status: {property.status}</p>
          <p>Type: {property.propertyType}</p>
          <p>City: {property.city}</p>
        </div>
      ))}

    </div>
  );
}

export default PropertiesPage;