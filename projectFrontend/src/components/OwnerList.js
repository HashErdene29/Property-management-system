import React from 'react';
import Avatar from './Avatar';

const OwnerList = ({
  items,
  showButtons,
  handleAccept,
  handleReject,
  handleEdit,
  handleDelete,
  onItemClick,
  type
}) => {
  
  return (
    <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-600">
      {items.map((item) => (
        <li key={item.id} className="pb-3 pt-3">
          <div
            className="flex items-center space-x-4"
            onClick={() => {
              if (type=== 'messages') {
                onItemClick(item);
              }
            }}
          >
            <Avatar />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {item.name ? item.name : item.customer.firstname + ' ' + item.customer.lastname}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {item.description ? item.description : item.message}
              </p>
            </div>

            {showButtons && (
              <div>
                {type=== 'offers' && (
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

                {type=== 'listing' && (
                  <>
                    <button
                      className="px-2 py-1 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      onClick={() => handleEdit(item.id)}
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
  );
};

export default OwnerList;
