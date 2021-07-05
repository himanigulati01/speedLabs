import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderDetails } from "../../States";
import { getToken } from "../../utils";
import Order from "./Order";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useRecoilState(orderDetails);
  useEffect(() => order(), []);
  const order = async (id) => {
    try {
      const response = await fetch(`http://35.244.8.93:4000/api/users/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const orderJson = await response.json();
      console.log(orderJson.orders);
      setOrders(orderJson.orders);
    } catch (error) {
      console.log("Order " + error);
    }
  };
  return (
    <div style={{ background: "rgb(233, 227, 234)", height: "100%" }}>
      <header id="site-header">
        <div class="container">
          <h1 style={{ padding: "16px 0" }}>Order History</h1>
        </div>
      </header>
      <div className="orders">
        {orders.map((order) => (
          <Order
            invoice_number={order.invoice_number}
            amount={order.amount}
            price_before_coupon={order.price_before_coupon}
            key={order.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
