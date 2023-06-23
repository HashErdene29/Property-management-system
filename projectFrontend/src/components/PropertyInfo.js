import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PropertyInfo = ({ property }) => {
  const [offerStatus, setOfferStatus] = useState(null);
  const [offerID, setOfferID] = useState(null);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");

  const [isSaved, setIsSaved] = useState(false);
  const [saveID, setSaveID] = useState(null);

  useEffect(() => {
    const fetchOfferStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/offer/findby/${user_id}/${property.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          if (response.data.customer) {
            setOfferStatus(response.data.status);
            setOfferID(response.data.id);
          } else {
            setOfferStatus("AVAILABLE");
          }
        }
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    };

    const fetchSaveStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/saved/getby/${user_id}/${property.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          if (response.data) {
            setSaveID(response.data.id);
            setIsSaved(true);
          } else {
            setIsSaved(false);
          }
        }
      } catch (error) {
        console.error("Error fetching save status:", error);
      }
    };

    fetchOfferStatus();
    fetchSaveStatus();
  }, [property.id]);

  const handlePlaceOffer = async () => {
    const offerData = {
      status: "PENDING",
      customer: {
        id: user_id,
      },
      property: {
        id: property.id,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/offer",
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOfferStatus("PENDING");
      }
    } catch (error) {
      console.error("Error placing offer:", error);
    }
  };

  const handleSaveProperty = async () => {
    try {
      const saveData = {
        customer: {
          id: user_id,
        },
        property: {
          id: property.id,
        },
      };

      if (!isSaved) {
        // Save the property
        const response = await axios.post(
          "http://localhost:8080/api/v1/saved",
          saveData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsSaved(true);
        }
      } else {
        // Unsave the property
        const response = await axios.delete(
          `http://localhost:8080/api/v1/saved/${saveID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsSaved(false);
        }
      }
    } catch (error) {
      console.error("Error saving/unsaving property:", error);
    }
  };

  const handleCancelOffer = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/offer/${offerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOfferStatus("AVAILABLE");
        setOfferID(null);
      }
    } catch (error) {
      console.error("Error canceling offer:", error);
    }
  };

  const isPropertyOwner = property.owner.id === parseInt(user_id);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-2">
      <div className="flex items-center mb-4">
        <div className="mr-2 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold">
            {property.owner.firstname} {property.owner.lastname}
          </h2>
          <p className="text-sm text-gray-400">Real Estate Agent</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{property.name}</h3>
        <p className="text-gray-300">{property.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">${property.price}</p>
        <div>
          {offerStatus === "PENDING" ? (
            <button
              className="bg-blue-500 mr-1 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleCancelOffer}
              disabled={role_id === "2"}
            >
              Cancel
            </button>
          ) : null}

          {offerStatus === "AVAILABLE" && !isPropertyOwner ?  (
            <button
              className="bg-blue-500 mr-1 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handlePlaceOffer}
              disabled={role_id === "2"}
            >
              Place Offer
            </button>
          ) : null}
          {isPropertyOwner ? <Link
              to={"/profile"}
              className="bg-blue-500 mr-1 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </Link> : null}
          {!isPropertyOwner ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSaveProperty}
              disabled={role_id === "2"}
            >
              {isSaved ? "Unsave" : "Save"}
            </button>
          ) : (
            <Link
              to={"/profile"}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
