import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";
import { Items } from "../Component/CartComponent/Items";
import  CheckoutPage  from "./CheckoutPage";

export const Cart = () => {
  useEffect(() => { window.scrollTo(0, 0) }, []);
  // const razorpay=useRazorpay();
  
      const [data, setdata] = useState();
      const[item,setItem]=useState([]);
      const [loading, setLoading] = useState(9);
      const [totalAmount, setTotalAmount] = useState(0);
      const[token,setToken]=useState(sessionStorage.getItem("token"));
      const [couponCode, setCouponCode] = useState('');
      const [discount, setDiscount] = useState(0);
      const [showCheckout, setShowCheckout] = useState(false);

      const handleProceedToCheckout = () => {
        setShowCheckout(true);
      };

      const fatchCart = async () => {
        // get cart item
        console.log(token);
        const res = await fetch("http://107.20.36.48:9090/cart/1", {headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
          },
        });
        const data = await res.json();
        setTotalAmount(data.totalAmount);
        setItem(data.cartDetalis);
      };

      useEffect(() => {
        fatchCart();

      }, [loading]);

      const applyCoupon = async () => {
        // Make a call to http://107.20.36.48:9090/getDiscount with totalCart Value and coupon code
        const res = await fetch(`http://107.20.36.48:9090/getDiscount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totalAmount: totalAmount,
            couponCode: couponCode,
          }),
        });

        const couponData = await res.json();

        if (couponData.active) {
          // Apply discount if the coupon is active
          setDiscount(parseFloat(couponData.totalDiscount));
        } else {
          // Reset discount if the coupon is not active
          setDiscount(0);
          alert('Invalid coupon code. Please try again.');
        }
      }

      

      const createOrder = async (e) => {
        const res = await fetch(`http://107.20.36.48:9090/payment/${totalAmount}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
        "Authorization": "Bearer " + token
          },
        });
        const da = await res.json();
        setdata(da);
        return da;
      }


      const handlePayment = async () => {
        const order = await createOrder();
        const options = {
          key: order.key,
          amount: order.amount, 
          currency: order.currency,
          name: "userName",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.orderId, 
          handler: function (response) {
            console.log(response);
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
          prefill: {
            name: "vivek",
            email: "vivek@gmail.com",
            contact: 7405999619,
          },
          notes: {
            address: "ABC, Delhi",
          },
          theme: {
            color: "#3399cc",
          },
        };
      
        const rzp1 = new window.Razorpay(options);;
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
      
        rzp1.open();
      };
     





  return (
    <>
      <Header />
      <div >
      {totalAmount === 0 ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold',fontSize: '1.5em',margin: '200px 0'}}>Your cart is empty. Start Shopping!</p>
      ) : (
      <div className="shopping-cart">
        <div className="px-4 px-lg-0">
          <div className="pb-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                  {/* Shopping cart table */}
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              Product
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price(€)</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>


                    {item ?    item.map((elem,index) => {
                          return (
                            <>

                              <Items
                                key={index} prop={elem} setLoading={setLoading} />
                              </>
                          )})
                        :<></>}

                      </tbody>
                    </table>
                  </div>
                  {/* End */}
                </div>
              </div>
              <div className="row py-5 p-4 bg-white rounded shadow-sm">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                    Order summary{" "}
                  </div>
                  <div className="p-4">
                    <p className="font-italic mb-4">
                      Shipping and additional costs are calculated based on
                      values you have entered.
                    </p>
                    <ul className="list-unstyled mb-4">
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Order Subtotal </strong>
                        <strong>€ {totalAmount}</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">
                          Shipping and handling
                        </strong>
                        <strong>€{totalAmount*0.1 + 2}</strong>
                      </li>
                      {/* <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Tax</strong>
                        <strong>€ 0.00</strong>
                      </li> */}
                      <li>
                      <input className="d-flex justify-content-between py-3 border-bottom"
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                      </li>

                      <li>
                          <button href=""
                      className="btn btn-dark rounded-pill py-1 btn-block" onClick={applyCoupon}>Apply Coupon</button>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">
                          Discount
                        </strong>
                        <strong>€{discount}</strong>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-bottom">
                        <strong className="text-muted">Total</strong>
                        <h3 className="font-weight-bold">€ {totalAmount + totalAmount*0.1 + 2 - discount }</h3>
                      </li>
                     
                    </ul>
                    {/* <button
                      href=""
                      className="btn btn-dark rounded-pill py-2 btn-block"
                      onClick={(e) => handlePayment(e)}
                    >
                      Proceed to checkout
                    </button> */}
                    <button
                      href=""
                      className="btn btn-dark rounded-pill py-2 btn-block"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to checkout
                    </button>
                    {showCheckout && (
                          <CheckoutPage
                            totalAmount={totalAmount}
                            discount={discount}
                            handlePayment={handlePayment}
                          />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
      {/* <Footer /> */}
    </>
  );
};
