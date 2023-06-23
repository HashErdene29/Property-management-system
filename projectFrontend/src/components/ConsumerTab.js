import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from './Avatar';
import ConsumerList from './ConsumerList';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import MyDocument from './CreatePDF';

const ConsumerTab = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [historyOffers, setHistoryOffers] = useState([]);
  const [currentOffers, setCurrentOffers] = useState([]);
  const [savedOffers, setSavedOffers] = useState([]);
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');
  const role_id = localStorage.getItem('role_id');

  useEffect(() => {
    fetchSavedOffers();
    fetchHistoryOffers();
    fetchCurrentOffers();
  }, []);

  const fetchSavedOffers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/saved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setSavedOffers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistoryOffers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/offer/history/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setHistoryOffers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentOffers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/offer/findbycustomer/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        const filteredOffers = response.data.filter((offer) => offer.status !== 'SOLD');
        setCurrentOffers(filteredOffers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusToggle = (type, id) => {
    switch (type) {
      case 'history':
        setHistoryOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === id
              ? {
                  ...offer,
                  status: offer.status === 'Pending' ? 'Contingent' : 'Pending',
                }
              : offer
          )
        );
        break;
      case 'current':
        setCurrentOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === id
              ? {
                  ...offer,
                  status: offer.status === 'Pending' ? 'Contingent' : 'Pending',
                }
              : offer
          )
        );
        break;
      default:
        break;
    }
  };


  
  const handlePrintReceipt = (offer) => {
    // Generate the PDF document
    const pdfDoc = <MyDocument offer={offer} />;
    console.log(offer)

    // Convert the PDF document to a blob
    pdf(pdfDoc)
      .toBlob()
      .then((blob) => {
        // Create a URL for the blob
        const pdfUrl = URL.createObjectURL(blob);
    
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `receipt_${offer.id}.pdf`;
    
        // Append the link to the document body
        document.body.appendChild(link);
    
        // Click the link to trigger the download
        link.click();
    
        // Clean up the temporary link and URL
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      });
  };
  
  

  const handleUnsaveOffer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/saved/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <ConsumerList
              offers={historyOffers}
              showStatus={false}
              showPrintReceipt={true}
              handleStatusToggle={handleStatusToggle.bind(null, 'history')}
              handlePrintReceipt={handlePrintReceipt}
            />
          </div>
        );
      case 'current':
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <ConsumerList
              offers={currentOffers}
              showStatus={true}
              showPrintReceipt={false}
              handleStatusToggle={handleStatusToggle.bind(null, 'current')}
            />
          </div>
        );
      case 'saved':
        return (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <ConsumerList
              offers={savedOffers}
              showStatus={false}
              showPrintReceipt={false}
              handleUnsaveOffer={handleUnsaveOffer}
            />
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
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              id="history-tab"
              data-tabs-target="#history"
              type="button"
              role="tab"
              aria-controls="history"
              aria-selected={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'current'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              id="current-tab"
              data-tabs-target="#current"
              type="button"
              role="tab"
              aria-controls="current"
              aria-selected={activeTab === 'current'}
              onClick={() => setActiveTab('current')}
            >
              Current Offers
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'saved'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              id="saved-tab"
              data-tabs-target="#saved"
              type="button"
              role="tab"
              aria-controls="saved"
              aria-selected={activeTab === 'saved'}
              onClick={() => setActiveTab('saved')}
            >
              Saved List
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">{renderTabContent()}</div>
    </div>
  );
};

export default ConsumerTab;
