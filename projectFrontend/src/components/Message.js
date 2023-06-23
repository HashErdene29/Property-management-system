import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'

const Message = ({id, ownerID}) => {
  const [message, setMessage] = useState('');
  const role_id = localStorage.getItem("role_id");
  const user_id = localStorage.getItem("user_id");

  const alert = useAlert()

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const body = {
        message: message,
        customer: {
          id: user_id
        },
        property: {
          id: id
        },
        owner: {
          id: ownerID
        }
      };

      const response = await axios.post(
        'http://localhost:8080/api/v1/message',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        alert.success("Message sent to owner");
      }
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Ask a question..."
        value={message}
        onChange={handleMessageChange}
      ></textarea>
      <button
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleSendMessage}
        disabled={role_id === "2"}
      >
        Send Message
      </button>
    </div>
  );
};

export default Message;
