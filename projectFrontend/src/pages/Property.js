import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";
import Message from "../components/Message";
import PropertyInfo from "../components/PropertyInfo";

const Property = () => {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchPropertyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/property/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setPropertyData(response.data);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();
  }, [id]);

  return (
    <Layout>
      <div className="flex flex-row gap-4 justify-center">
        <div className="w-3/5">
          <Gallery />
        </div>
        <div className="w-3/5">
          {propertyData ? (
            <PropertyInfo property={propertyData} />
          ) : (
            <p>Loading property data...</p>
          )}
          {propertyData ? (
            <Message id={id} ownerID={propertyData.owner.id} />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Property;
