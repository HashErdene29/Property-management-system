import React from 'react';
import Avatar from './Avatar';

const ConsumerList = ({ offers, showStatus, showPrintReceipt, handlePrintReceipt, handleUnsaveOffer }) => {
  return (
    <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-600">
      {offers.map((offer) => (
        <li key={offer.id} className="pb-3 pt-3">
          <div className="flex items-center space-x-4">
            <Avatar />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {offer.property.owner.firstname} {offer.property.owner.lastname}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {offer.property.owner.email}
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {offer.property.name}
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ${offer.property.price}
            </div>
            {showStatus && (
              <div>
                <p
                  className={`px-2 py-1 text-sm rounded-md ${
                    offer.status === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {offer.status}
                </p>
              </div>
            )}
            {showPrintReceipt && (
              <div>
                <button
                  className="ml-2 px-2 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={() => handlePrintReceipt(offer)}
                >
                  Print Receipt
                </button>
              </div>
            )}
            {handleUnsaveOffer && (
              <div>
                <button
                  className="ml-2 px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  onClick={() => handleUnsaveOffer(offer.id)}
                >
                  Unsave
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ConsumerList;
