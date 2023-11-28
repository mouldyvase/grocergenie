import React, { useEffect } from 'react';
import { Header } from '../Component/Header';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../Component/Footer';
import { AddProduct } from '../Component/HomeComponent/AddProduct';
import SendOfferEmail from '../Component/HomeComponent/SendOfferEmail';


export const Admin = () => {
const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    checkAdminAccess();
  }, []);

  const checkAdminAccess = () => {
    const isAdmin = sessionStorage.getItem('admin') === 'true';

    if (!isAdmin) {
      alert('You are not an admin');
      navigate('/login');
    }
  };

  return (
    <>
      <Header />
      {checkAdminAccess()}
      <SendOfferEmail/>
      <AddProduct />
      {/* <Footer /> */}
    </>
  );
};
