import React from "react";
import { Link } from "react-router-dom";

const Card = ({ property }) => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2 my-4">
        <Link to={`/property/${property.id}`}>
          <img className="p-8 rounded-t-lg" src="/images/realEstate.png" alt="Property" />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/property/${property.id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {property.name}
            </h5>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${property.price}
            </span>
            <Link
              to={`/property/${property.id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
