/************************* NEW  ******************************/
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import "./Cart.css";

import {
  cartItemsAdded,
  CartLength,
  cartPayloader,
  paymentResp,
} from "../States";

import RazorpayButton from "../paymentGateway/RazorpayButton";
import MessageBox from "../MessageBox";
import { getInstituteId, getToken } from "../utils";
import Loader from "../loader";

function GetItemsCart(props) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
  const [paymentResponse, setPaymentResponse] = useRecoilState(paymentResp);
  const [payloader, setPayloader] = useRecoilState(cartPayloader);

  const [cartlength, setCartlength] = useRecoilState(CartLength);
  const [loading, setLoading] = useState(false);
  const [fetchError, setfetchError] = useState("");
  const [removeItemError, setremoveItemError] = useState("");
  const [removeCouponError, setremoveCouponError] = useState("");
  const [applyCouponError, setapplyCouponError] = useState("");
  const [couponCode, setcouponCode] = useState("");
  const [payError, setpayError] = useState("");

  useEffect(() => {
    fetchCartItems();
  }, []);

  //fetching Cart Items
  const fetchCartItems = async () => {
    if (!cartItems) setLoading(true);
    try {
      const response = await fetch("http://35.244.8.93:4000/api/users/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const jsonResponse = await response.json();
      //navbar cart length issue
      setLoading(false);
      if (jsonResponse.flag === 2) {
        setfetchError(jsonResponse.msg);
      } else {
        setCartlength(jsonResponse.cartItems.Items.length);
        console.log(cartlength);
        setCartItems(jsonResponse.cartItems.Items);
        console.log(jsonResponse);
        setPayloader(jsonResponse.cartItems);
      }
    } catch (error) {
      setfetchError(error.message);
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/cart/${id}/remove`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const removeItem = await response.json();
      setLoading(false);
      console.log("REMOVE ITEM ", removeItem);
      if (removeItem.flag === 1) fetchCartItems();
      else {
        setremoveItemError(removeItem.msg);
      }
    } catch (error) {
      setremoveItemError(error.message);
      console.log("REMOVE ITEM ERROR " + error);
    }
  };

  const applyCoupon = async (id, coupon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/cart/${id}?apply=${coupon}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const applyCoupon = await response.json();
      setLoading(false);
      if (applyCoupon.flag === 2) {
        setapplyCouponError(applyCoupon.msg);
      } else {
        fetchCartItems();
      }
      console.log("COUPON ADDED", applyCoupon);
    } catch (error) {
      setapplyCouponError(error.message);
      console.log("COUPON ADDED ERROR: " + error);
    }
  };

  const removeCoupon = async (id, coupon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/cart/${id}/removecoupon`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const removeCoupon = await response.json();
      setLoading(false);
      if (removeCoupon.flag === 2) {
        setremoveCouponError(removeCoupon.msg);
      } else {
        fetchCartItems();
      }
      console.log("COUPON REMOVED", removeCoupon);
    } catch (error) {
      setremoveCouponError(error.message);
      console.log("COUPON REMOVED ERROR: " + error);
    }
  };

  const handleSuccessPayment = async (payment_id, signature) => {
    try {
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/cart/razorpay",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const paymentRes = await response.json();
      setPaymentResponse(paymentRes.details);
      console.log(paymentResponse);
      console.log(payment_id);
      const item = {
        payment_id: payment_id,
        order_id: paymentRes.details.id,
      };
      console.log(item);
      console.log(signature);
      postData(
        payment_id,
        paymentRes.details.id,
        paymentRes.details.amount,
        signature
      );
    } catch (error) {
      console.log(error);
    }
  };

  //post payment details to backend
  const postData = async (payment_id, order_id, amount, signature) => {
    const item = {
      payment_id: payment_id,
      order_id: order_id,
      payment_secret: "S&xd!rstpLw!+w#u$EDnY_K^=UCah-?EBncknj35",
      amount: amount,
      currency: "INR",
      receipt: "FDSJKI",
    };
    try {
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/cart/checkout",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "x-razorpay-signature": signature,
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const paymentRes2 = await response.json();
      if (paymentRes2.flag === 2) setpayError(paymentRes2.msg);
      else {
        props.history.push("/orders");
      }
      console.log("res2", paymentRes2);
    } catch (error) {
      setpayError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {loading && <Loader></Loader>}
        {/* heading banner */}
        {/* breadcrumb nav */}
        <nav class="breadcrumb-nav">
          <div class="container">
            {/* breadcrumb */}
            <ol class="breadcrumb">
              <li>
                <a href="home.html">Home</a>
              </li>
              <li>
                <a href="shop.html">Shop</a>
              </li>
              <li class="active">Cart Page</li>
            </ol>
          </div>
        </nav>
        {/* cart content block */}
        {fetchError && <MessageBox variant="danger">{fetchError}</MessageBox>}
        {applyCouponError && (
          <MessageBox variant="danger">{applyCouponError}</MessageBox>
        )}
        {removeCouponError && (
          <MessageBox variant="danger">{removeCouponError}</MessageBox>
        )}
        {removeItemError && (
          <MessageBox variant="danger">{removeItemError}</MessageBox>
        )}
        {payError && <MessageBox variant="danger">{payError}</MessageBox>}

        {cartItems && (
          <section class="cart-content-block container">
            {!cartItems.length && (
              <h6> Empty Cart!!! Go to Marketplace and get some courses.</h6>
            )}
            {/* cart form */}
            <form action="#" class="cart-form">
              <div class="table-wrap">
                {/* cart data table */}
                <table class="table tab-full-responsive cart-data-table font-lato">
                  <thead class="hidden-xs">
                    <tr>
                      <th>&nbsp;</th>
                      <th class="col01">Product</th>
                      <th>Price</th>
                      <th>Coupon</th>
                      <th>Discount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr>
                        <td>
                          <i
                            href="#"
                            class="btn-remove fas fa-times"
                            onClick={() => removeItem(item.product_id)}
                          >
                            <span class="sr-only">remove</span>
                          </i>
                        </td>
                        <td data-title="Product" class="col01">
                          <div>
                            <div class="pro-name-wrap">
                              <div class="alignleft no-shrink hidden-xs">
                                <img
                                  src={item.image_url}
                                  alt="image description"
                                />
                              </div>
                              <div class="descr-wrap">
                                <h3 class="fw-normal">{item.product_name}</h3>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td data-title="Price">
                          <span>
                            <strong class="price element-block">
                              {" "}
                              ???{item.price_before_coupon.toFixed(2)}
                            </strong>
                          </span>
                        </td>
                        {item.coupon_id ? (
                          <td data-title="Coupon Id">
                            <div>
                              <div className="quantity green">
                                Applied: {item.coupon_name}
                              </div>
                              <button
                                className="remove-coupon1"
                                onClick={() => removeCoupon(item.product_id)}
                              >
                                Remove Coupon
                              </button>
                            </div>
                          </td>
                        ) : (
                          <td data-title="Coupon">
                            <div>
                              <div className="quantity">
                                <input
                                  type="text"
                                  class="form-control"
                                  onChange={(e) =>
                                    setcouponCode(e.target.value)
                                  }
                                  placeholder="Coupon Code"
                                />
                                <button
                                  className="apply-coupon"
                                  onClick={() =>
                                    applyCoupon(item.product_id, couponCode)
                                  }
                                >
                                  Apply Coupon
                                </button>
                              </div>
                            </div>
                          </td>
                        )}

                        <td data-title="Discount">
                          <span>
                            <strong class="price element-block">
                              {" "}
                              ???
                              {(
                                item.price_before_coupon - item.net_price
                              ).toFixed(2)}
                            </strong>
                          </span>
                        </td>
                        <td data-title="Total">
                          <span>
                            <strong class="element-block price">
                              ???{item.net_price.toFixed(2)}
                            </strong>
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan="2" class="text-right btn-actions">
                        <div>
                          <a
                            href={`/course-list/${getInstituteId()}`}
                            class="btn btn-default font-lato fw-normal text-uppercase"
                          >
                            Back to Courses
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-offset-2 col-sm-10 col-md-offset-6 col-md-6">
                  <h2>Cart Totals</h2>
                  <div class="table-wrap">
                    {/* table cart total */}
                    <table class="table table-cart-total">
                      <tbody>
                        <tr>
                          <td class="font-lato fw-bold">Subtotal</td>
                          <td>
                            <div class="price">
                              ???
                              {cartItems
                                .reduce(
                                  (a, curr) =>
                                    a +
                                    (curr.price_before_coupon
                                      ? curr.price_before_coupon
                                      : 0),
                                  0
                                )
                                .toFixed(2)}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="font-lato fw-bold">Discount</td>
                          <td>
                            <div lass="price">
                              ???
                              {(
                                cartItems.reduce(
                                  (a, curr) =>
                                    a +
                                    (curr.price_before_coupon
                                      ? curr.price_before_coupon
                                      : 0),
                                  0
                                ) - payloader.total_amt
                              ).toFixed(2)}
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>Total</td>
                          <td>
                            <strong class="price">
                              ???{payloader.total_amt}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <RazorpayButton
                    amount={payloader.total_amt * 100}
                    order_id={paymentResponse.id}
                    onSuccess={handleSuccessPayment}
                  />
                </div>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

export default GetItemsCart;
