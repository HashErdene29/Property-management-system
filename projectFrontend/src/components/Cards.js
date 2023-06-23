import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Layout from "./Layout";

const Cards = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/property", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.status === 200) {
          setProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Layout>
      <div className="ml-2">
        <h1 className="text-2xl font-bold mb-2">Newest Listings</h1>
        <p className="text-gray-500">See the most up-to-date listings</p>
      </div>
      <div className="flex flex-wrap justify-start">
        {properties.map((property) => (
          <Card key={property.id} property={property} />
        ))}
      </div>
    </Layout>
  );
};

export default Cards;
