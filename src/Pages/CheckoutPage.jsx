import React, { useState } from 'react';
import '../index.css';

const CheckoutPage = ({ totalAmount, discount, handlePayment }) => {
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handlePlaceOrder = () => {
    // You can perform additional validation if needed
    if (!address || !contactInfo) {
      alert('Please enter address and contact information.');
      return;
    }
    else {
      alert('Your order has been placed! Thanks for shopping!');
      return;
    }

    // Proceed with placing the order or any other logic
    // Call handlePayment method from the parent component or handle it here
    handlePayment({ address, contactInfo });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="checkout-container">
        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold" >
          <h2>Checkout</h2>
        </div>
        <div>
          <br />
          <div className="address-container">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <br />
          <div className="address-container">
            <label>Phone:</label>
            <input
              type="text"
              placeholder="Enter your contact information"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <br />
          <br />
          <button href=""
            className="btn btn-dark rounded-pill py-4 btn-block"
            onClick={handlePlaceOrder}>Place Order</button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
