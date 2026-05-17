import { useEffect, useState } from "react";
import API from "../../services/api";

function PropertiesPage() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {

    API.get("/properties")
      .then((res) => {
        setProperties(res.data.properties || res.data || []);
      })
      .catch((err) => {
        console.log(err);
        setProperties([]);
      });

  }, []);

  return (
    <div>
      <h1>🏨 Properties</h1>

      {properties.map((property) => (
        <div key={property._id}>
          <p>{property.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PropertiesPage;