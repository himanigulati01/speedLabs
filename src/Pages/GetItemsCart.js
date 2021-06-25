import { CircularProgress } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import CartItemsPreview from "../Components/Cart/CartItemsPreview/CartItemsPreview";
import "./GetItemsCart.css";
import RazorpayButton from "../paymentGateway/RazorpayButton";
import {
  cartItemsAdded,
  CartLength,
  cartPayloader,
  productDetails,
  UserDetails,
  paymentResp,
} from "../States";
import { getToken } from "../utils";

const GetItemsCart = () => {
  const [paymentResponse, setPaymentResponse] = useRecoilState(paymentResp);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
  const [payloader, setPayloader] = useRecoilState(cartPayloader);
  const [products, setProducts] = useRecoilState(productDetails);
  const [, setCartlength] = useRecoilState(CartLength);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);
  useEffect(() => {
    fetchCartItems();
  }, []);

  //fetching products in case user come directly to cart
  //if not, then recoil state product
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/products/marketplace",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const productResponse = await response.json();
      setProducts(productResponse.products);
      console.log(productResponse);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };

  //fetching Cart Items
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://35.244.8.93:4000/api/users/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const jsonResponse = await response.json();
      //navbar cart length issue
      setCartlength(jsonResponse.cartItems.Items.length);
      setCartItems(jsonResponse.cartItems.Items);
      console.log(jsonResponse.Items);
      setPayloader(jsonResponse.cartItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      postData(item, signature);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (item, signature) => {
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
      console.log("res2", paymentRes2);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading || cartItems === [] ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className="Cart">
          <div
            style={{
              marginLeft: "22px",
            }}
          >
            {cartItems.map(({ ...otherCollectionProps }, index) => (
              <CartItemsPreview key={index} {...otherCollectionProps} />
            ))}
          </div>
          <div className="Total">
            <h2>Total Amount : Rs.{payloader.total_amt}</h2>
            <RazorpayButton
              amount={payloader.total_amt * 100}
              order_id={paymentResponse.id}
              onSuccess={handleSuccessPayment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetItemsCart;
