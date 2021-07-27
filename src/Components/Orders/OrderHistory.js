import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./Order.css";

import { orderDetails } from "../../States";
import { getToken } from "../../utils";
import Loader from "../../loader";
import MessageBox from "../../MessageBox";

function OrderHistory(props) {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useRecoilState(orderDetails);
  const [loading, setLoading] = useState(false);
  const [errorOrder, setError] = useState("");

  const getOrders = async () => {
    try {
      if (!data) setLoading(true);
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
      setOrders(orderJson);
      const orderList = orderArray(orderJson.orders, "order_id");
      console.log(orderList);
      setData(orderList);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log("Order " + error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
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
            <li class="active">OrderHistory</li>
          </ol>
        </div>
        <div>
          <div class="container holder">
            <div class="align">
              <h1>
                <i className="fa fa-fw fa-shopping-cart"></i> Order History
              </h1>
            </div>
          </div>
        </div>
      </nav>
      {loading && <Loader></Loader>}
      {errorOrder && <MessageBox variant="danger">{errorOrder}</MessageBox>}
      {data && (
        <section class="container order-container">
          <div class="cart-form">
            <div class="table-wrap">
              {/* cart data table */}
              <table class="table table-striped tab-full-responsive cart-data-table auto-index font-lato">
                <thead class="hidden-xs">
                  <tr>
                    <th>Sl No.</th>
                    <th>Order Id</th>
                    <th>Invoice Number</th>
                    <th>Payment Id</th>
                    <th>Issued On</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr>
                      <td data-title="Sl No."></td>
                      <td data-title="Order Id">{row[0]}</td>
                      <td data-title="Invoice No.">{row[1].invoice_number}</td>
                      <td data-title="Payment Id">{row[1].payment_id}</td>
                      <td data-title="Issued on">{row[1].issued_on}</td>
                      {row[1].order_status === "processed" ? (
                        <td data-title="status">
                          <i className="success-status">Processed</i>
                        </td>
                      ) : (
                        <td>
                          <i className="pending-status">Pending</i>
                        </td>
                      )}

                      <td data-title="Amount">₹{row[1].amount.toFixed(2)}</td>
                      <td data-title="Actions">
                        <a href={`/orders/${row[0]}/details`}>
                          <i className="fa fa-fw fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default OrderHistory;
