import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPropertyModal = ({ isOpen, onClose, onSubmit, propertyData, onUpdate }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");
  const [updatedPropertyData, setUpdatedPropertyData] = useState(propertyData);

  useEffect(() => {
    setUpdatedPropertyData(propertyData);
  }, [propertyData]);

  const handleEdit = () => {
    const { name, price, description } = updatedPropertyData;
    const requestBody = { name, price, description };

    axios
      .put(`http://localhost:8080/api/v1/property/${propertyData.id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onUpdate(updatedPropertyData); 
        onSubmit(); 
      })
      .catch((error) => {
        console.error("Error updating property:", error);
 
      });
  };

  const handlePropertyChange = (event) => {
    const { name, value } = event.target;

    setUpdatedPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow max-h-500">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Property
            </h2>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="text"
                name="name"
                value={updatedPropertyData.name}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="price"
                value={updatedPropertyData.price}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 resize-none"
                name="description"
                value={
                  updatedPropertyData.description
                    ? updatedPropertyData.description
                    : ""
                }
                onChange={handlePropertyChange}
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
