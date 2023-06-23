import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AddPropertyModal from "./AddPropertyModal";
import axios from "axios";
import { useAlert } from 'react-alert'

const Header = () => {
  const alert = useAlert()

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const role_id = localStorage.getItem("role_id");
  const [propertyData, setPropertyData] = useState({
    name: "",
    bedNo: 1,
    bathNo: 1,
    sqft: 1,
    garageNo: 1,
    price: 1,
    address: {
      state: "",
      city: "",
      street: "",
      zipcode: "",
    },
    owner: {
      id: user_id,
    },
  });

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleAddProperty = () => {
    const requestBody = JSON.stringify(propertyData);

    // Send the POST request
    axios.post("http://localhost:8080/api/v1/property", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response
        if(response.status === 200) {
          alert.success("Property added successfully");

        }        
      })
      .catch((error) => {
        // Handle the error
        console.error("Error adding property:", error);
      });

    toggleModal();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800">
      <div className="ml-10 mr-10 flex items-center justify-between h-16">
        <Link to="/home">
          <span className="text-white font-semibold text-xl">Realtor.com</span>
        </Link>
        <div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-1 rounded-md text-sm font-medium"
                onClick={toggleProfileDropdown}
              >
                <Avatar />
              </button>
            </div>
            {profileDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="profile-dropdown"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={toggleProfileDropdown}
                  >
                    Profile
                  </Link>
                  {role_id === "2" && (
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={toggleModal}
                    >
                      Add Property
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddPropertyModal
        isOpen={modalOpen}
        onClose={toggleModal}
        onSubmit={handleAddProperty}
        propertyData={propertyData}
        handlePropertyChange={handlePropertyChange}
        handleAddressChange={handleAddressChange}
      />
    </nav>
  );
};

export default Header;
