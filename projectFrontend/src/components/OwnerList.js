import React, { useState } from "react";
import Avatar from "./Avatar";
import EditPropertyModal from "./EditPropertyModal";

const OwnerList = ({
  items,
  showButtons,
  handleAccept,
  handleReject,
  handleDelete,
  handleCancel,
  onItemClick,
  type,
  updateData, // modified prop
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [updatedPropertyData, setUpdatedPropertyData] = useState(null);

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    setEditModalOpen(false);
    if (updatedPropertyData) {
      updateData((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedPropertyData.id ? updatedPropertyData : item
        )
      );
    }
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handlePropertyUpdate = (updatedData) => {
    setUpdatedPropertyData(updatedData);
    updateData(updatedData);
  };

  return (
    <div>
      <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-600">
        {items.map((item) => (
          <li key={item.id} className="pb-3 pt-3">
            <div
              className="flex items-center space-x-4"
              onClick={() => {
                if (type === "messages") {
                  onItemClick(item);
                }
              }}
            >
              <Avatar />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {item.name
                    ? item.name
                    : item.customer.firstname + " " + item.customer.lastname}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {item.description ? item.description : item.message}
                </p>
                {item.property && item.property.name !== undefined ? (
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.property.name + " - " + item.status}
                  </p>
                ) : null}
              </div>

              {showButtons && (
                <div>
                  {type === "offers" && (
                    <>
                      {item.status === "CONTINGENT" ? (
                        <button
                          className="px-2 py-1 mr-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <>
                          <button
                            className="px-2 py-1 mr-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                            onClick={() => handleAccept(item.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            onClick={() => handleReject(item.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </>
                  )}

                  {type === "listing" && (
                    <>
                      <button
                        className="px-2 py-1 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedProperty && (
        <EditPropertyModal
          isOpen={editModalOpen}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
          propertyData={selectedProperty}
          onUpdate={handlePropertyUpdate}
        />
      )}
    </div>
  );
};

export default OwnerList;
