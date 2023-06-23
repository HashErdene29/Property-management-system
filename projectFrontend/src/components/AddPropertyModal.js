import React from "react";

const AddPropertyModal = ({ isOpen, onClose, onSubmit, propertyData, handlePropertyChange, handleAddressChange }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 ${isOpen ? "flex" : "hidden"}`}>
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow max-h-500">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h2 className="text-xl font-semibold text-gray-900">Add Property</h2>
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
                value={propertyData.name}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="number"
                  name="bedNo"
                  value={propertyData.bedNo}
                  onChange={handlePropertyChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="number"
                  name="bathNo"
                  value={propertyData.bathNo}
                  onChange={handlePropertyChange}
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Square Footage</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="sqft"
                value={propertyData.sqft}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Garage</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="garageNo"
                value={propertyData.garageNo}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="price"
                value={propertyData.price}
                onChange={handlePropertyChange}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="text"
                name="state"
                value={propertyData.address.state}
                onChange={handleAddressChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="text"
                  name="city"
                  value={propertyData.address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="text"
                  name="street"
                  value={propertyData.address.street}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zipcode</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="text"
                name="zipcode"
                value={propertyData.address.zipcode}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={onSubmit}
            >
              Add
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

export default AddPropertyModal;
