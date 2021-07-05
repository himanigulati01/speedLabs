import "../Components/Cart/CartItemsPreview/CartPreview.css";

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import CartItemsPreview1 from "../Components/Cart/CartItemsPreview/CartItemsPreview1";
import "./GetItemsCart.css";
import RazorpayButton from "../paymentGateway/RazorpayButton";
import {
  cartItemsAdded,
  CartLength,
  cartPayloader,
  productDetails,
  paymentResp,
} from "../States";
import { getToken } from "../utils";
import Loading from "../Components/Loading";

const GetItemsCart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
  const [paymentResponse, setPaymentResponse] = useRecoilState(paymentResp);
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
  }, [products]);

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
  //fetching products in case user come directly to cart

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
      console.log("res2", paymentRes2);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ background: "#f7efff", height: "100%" }}>
      <header id="site-header">
        <div class="container">
          <h1 style={{ padding: "16px 0" }}>Shopping cart</h1>
        </div>
      </header>
      {(isLoading || cartItems === []) && (
        <div>
          <Loading />
        </div>
      )}
      {payloader.total_amt === 0 && (
        <Alert
          icon={false}
          severity="success"
          style={{ placeContent: "center" }}
        >
          Empty Cart!!! Go to Marketplace and get some.
        </Alert>
      )}
      {payloader.total_amt > 0 && (
        <div className="Cart">
          <div className="Cart-items">
            {cartItems.map(({ ...otherCollectionProps }, index) => (
              <CartItemsPreview1 key={index} {...otherCollectionProps} />
            ))}
          </div>
          <Card className="Total">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Amount
              </Typography>

              <Typography variant="h5" component="h2">
                Rs.{payloader.total_amt}
              </Typography>
            </CardContent>
            <CardActions>
              <RazorpayButton
                amount={payloader.total_amt * 100}
                order_id={paymentResponse.id}
                onSuccess={handleSuccessPayment}
              />
            </CardActions>
          </Card>
        </div>
      )}
      )
    </div>
  );
};

export default GetItemsCart;
