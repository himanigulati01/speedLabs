import React from "react";
import { getToken } from "../../utils";

const Order = () => {
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
      console.log(orderJson);
    } catch (error) {
      console.log("Order " + error);
    }
  };
  return (
    <>
      <button onClick={order}>Order</button>
    </>
  );
};

export default Order;
