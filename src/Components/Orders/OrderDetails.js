import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useRecoilState } from "recoil";
import { orderDetails } from "../../States";
import { getToken } from "../../utils";
const OrderDetails = (props) => {
  const [data, setData] = useRecoilState(orderDetails);
  const id = props.match.params.id;
  console.log(id);
  useEffect(() => order(), []);
  const order = async () => {
    try {
      const response = await fetch(`http://35.244.8.93:4000/api/users/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const orderJson = await response.json();
      function orderArray(objectArray, property) {
        const unordered_list = objectArray.reduce((acc, obj) => {
          const key = obj[property];
          if (!acc[key]) {
            acc[key] = {
              a: obj.id,
              order_id: obj.order_id,
              invoice_number: obj.invoice_number,
              user_id: obj.user_id,
              amount: obj.amount,
              issued_on: obj.issued_on,
              order_status: obj.order_status,
              method_of_payment: obj.method_of_payment,
              payment_id: obj.payment_id,
              product: [
                {
                  id: obj.product_id,
                  name: obj.product_name,
                  product_url: obj.image_url,
                },
              ],
            };
          }
          // Add object to list for given key's value
          else {
            acc[key].product.push({
              id: obj.product_id,
              name: obj.product_name,
              product_url: obj.image_url,
            });
            acc[key].amount = acc[key].amount + obj.amount;
          }

          return acc;
        }, {});
        //console.log(Object.entries(unordered_list).sort((a, b) => a[1] - b[1]));
        return Object.entries(unordered_list).sort((a, b) => a[1] - b[1]);
        //  return Object.entries(unordered_list).sort((a,b) => a[1]-b[1])
      }
      const orderList = orderArray(orderJson.orders, "order_id");
      console.log(orderList);

      setData(orderList.filter((orderItem) => orderItem[1].order_id === id));
    } catch (error) {
      console.log("Order " + error);
    }
  };
  console.log(data);
  return <div></div>;
};

export default withRouter(OrderDetails);
