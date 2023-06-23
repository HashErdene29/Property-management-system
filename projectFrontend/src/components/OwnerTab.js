import React, { useState, useEffect } from "react";
import OwnerList from "./OwnerList";
import MessageModal from "./MessageModal";
import axios from "axios";
import { useAlert } from "react-alert";

const OwnerTab = () => {
  const alert = useAlert();

  const [activeTab, setActiveTab] = useState("offers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const [offerItems, setOfferItems] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Item 1 description",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Item 2 description",
    },
  ]);

  useEffect(() => {

    fetchOfferData();
  }, []);

  
  const fetchOfferData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/offer/findbyowner/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data) {
        setOfferItems(response.data)
      }
    } catch (error) {
      console.log("Error fetching listingItems:", error);
    }
  };

  const [listingItems, setListingItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/property/findby/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setListingItems(response.data);
        }
      } catch (error) {
        console.log("Error fetching listingItems:", error);
      }
    };

    fetchData();
  }, []);

  const [messageItems, setMessageItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/message/findby/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setMessageItems(response.data);
        }
      } catch (error) {
        console.log("Error fetching listingItems:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAccept = (itemId) => {
    // Handle accept logic
    console.log(`Accept item ${itemId}`);
    axios.get(
      `http://localhost:8080/api/v1/offer/updatecont/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(response => {
      if(response) {
        fetchOfferData();
      }
    })

  };

  const handleReject = (itemId) => {
    console.log(`Reject item ${itemId}`);
    axios.get(
      `http://localhost:8080/api/v1/offer/reject/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(response => {
      if(response) {
        fetchOfferData();
      }
    })

  };

  const handleCancel = (itemId) => {
    console.log(`Reject item ${itemId}`);
    axios.get(
      `http://localhost:8080/api/v1/offer/cancel/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(response => {
      if(response) {
        fetchOfferData();
      }
    })

  };

  const handleEdit = (itemId) => {
    // Handle edit logic
    console.log(`Edit item ${itemId}`);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/property/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the data
        const updatedItems = listingItems.filter((item) => item.id !== itemId);
        setListingItems(updatedItems);
        alert.success("Deleted property!");
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const handleMessageItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDataUpdate = (updatedData) => {
    setListingItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === updatedData.id) {
          return updatedData;
        }
        return item;
      });
      return updatedItems;
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "offers":
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <OwnerList
              items={offerItems}
              showButtons
              handleAccept={handleAccept}
              handleReject={handleReject}
              handleCancel={handleCancel}
              type="offers"
              updateData={handleDataUpdate}
            />
          </div>
        );
      case "listing":
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <OwnerList
              items={listingItems}
              showButtons
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              type="listing"
              updateData={handleDataUpdate}
            />
          </div>
        );
      case "messages":
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <OwnerList
              items={messageItems}
              showButtons={false}
              onItemClick={handleMessageItemClick}
              type="messages"
            />
            {isModalOpen && (
              <MessageModal
                messageId={selectedMessageId}
                closeModal={closeModal}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "offers"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="offers-tab"
              data-tabs-target="#offers"
              type="button"
              role="tab"
              aria-controls="offers"
              aria-selected={activeTab === "offers"}
              onClick={() => handleTabClick("offers")}
            >
              Offers
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "listing"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="listing-tab"
              data-tabs-target="#listing"
              type="button"
              role="tab"
              aria-controls="listing"
              aria-selected={activeTab === "listing"}
              onClick={() => handleTabClick("listing")}
            >
              My Listing
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "messages"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`}
              id="messages-tab"
              data-tabs-target="#messages"
              type="button"
              role="tab"
              aria-controls="messages"
              aria-selected={activeTab === "messages"}
              onClick={() => handleTabClick("messages")}
            >
              Messages
            </button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">{renderTabContent()}</div>
    </div>
  );
};

export default OwnerTab;
