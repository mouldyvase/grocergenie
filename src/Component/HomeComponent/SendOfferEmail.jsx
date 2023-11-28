import React, { useState } from 'react';
import axios from 'axios';
import "./SendOfferEmail.css"

const SendOfferEmail = () => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendEmail = () => {
    // Perform any validation if needed

    // Make a POST request to send the offer email
    axios.post('http://107.20.36.48:9090/offer/sqs', { message })
      .then(response => {
        // Handle success
        console.log('Email sent successfully:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className="send-offer-email-container">
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        value={message}
        onChange={handleInputChange}
      />
      <button onClick={handleSendEmail} className='send-offer-button'>Send Email</button>
    </div>
  );
};

export default SendOfferEmail;
