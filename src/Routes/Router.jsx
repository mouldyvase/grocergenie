import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { Protected } from "../Component/Protected";
import CheckoutPage from "../Pages/CheckoutPage";
import { Admin } from "../Pages/Admin";

export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    sessionStorage.getItem("token") || false
  );

  return (
    <>
      <Routes>
      <Route
          path="/"
          element={isSignedIn ? <Home/> : <Login />}
        />
        {/* <Route path="/shop" element={ <Shop />} /> */}
        <Route path="/admin" element={ <Admin />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/shop"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Shop />
            </Protected>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/checkout" element={
        <Protected isSignedIn={isSignedIn}>
        <CheckOut />
      </Protected>
        } />
      </Routes>
    </>
  );
};
