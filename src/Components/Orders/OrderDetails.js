import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { orderDetails } from "../../States";
import { getInstituteId, getToken } from "../../utils";
import moment from "moment";
import Loader from "../../loader";
import MessageBox from "../../MessageBox";

function OrderDetailsPage(props) {
  const [data, setData] = useRecoilState(orderDetails);
  const id = props.match.params.id;
  const [loading, setLoading] = useState(false);
  const [errorOrderDetail, setError] = useState("");

  const fetchOrderDetails = async () => {
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
      console.log("hehe", orderJson);
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
                  price_before_coupon: obj.price_before_coupon,
                  net_price: obj.amount,
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
              price_before_coupon: obj.price_before_coupon,
              net_price: obj.amount,
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
      const orderData = orderList.find(
        (orderItem) => orderItem[1].order_id === id
      );
      if (orderData) setData(orderData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log("Order " + error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div class="container">
      <h1>Order Details</h1>
      {loading && <Loader></Loader>}
      {errorOrderDetail && (
        <MessageBox variant="danger">{errorOrderDetail}</MessageBox>
      )}
      {data && data[1] && (
        <div>
          <div class="row">
            <div class="col-md-6">
              <ul className="order_list">
                {data[1].order_status === "processed" ? (
                  <li>
                    <strong>Order Status</strong>{" "}
                    <i className="success-status">Processed</i>
                  </li>
                ) : (
                  <li>
                    <i className="pending-status">Pending</i>
                  </li>
                )}
                <li>
                  <strong>Order Id</strong> {data[1].order_id}
                </li>
                <li>
                  <strong>Issued On</strong>{" "}
                  {data[1] &&
                    moment(data[1].issued_on)
                      .local()
                      .format("DD-MM-YYYY   HH:mm:ss")}
                </li>
              </ul>
            </div>

            <div class="col-md-6">
              <ul className="order_list">
                <li>
                  <strong>Mode of Payment</strong>{" "}
                  {data && data[1].method_of_payment}
                </li>
                <li>
                  <strong>Payment Id</strong> {data && data[1].payment_id}
                </li>
                <li>
                  <strong>Invoice Number</strong>{" "}
                  {data && data[1].invoice_number}
                </li>
              </ul>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <table class="table table-striped tab-full-responsive cart-data-table auto-index font-lato">
                <thead class="hidden-xs">
                  <tr>
                    <th>Sl No.</th>
                    <th class="col01">Items</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data[1].product.map((item) => (
                    <tr>
                      <td></td>
                      <td data-title="Product" class="col01">
                        <div>
                          <div class="pro-name-wrap">
                            <div class="alignleft no-shrink hidden-xs">
                              <img
                                src={item.product_url}
                                alt="image description"
                              />
                            </div>
                            <div class="descr-wrap">
                              <h3 class="fw-normal">{item.name}</h3>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td data-title="Price">
                        <span>
                          <strong class="price element-block">
                            {" "}
                            ₹{item.price_before_coupon.toFixed(2)}
                          </strong>
                        </span>
                      </td>
                      <td data-title="Discount">
                        <span>
                          <strong class="price element-block">
                            {" "}
                            ₹
                            {(
                              item.price_before_coupon - item.net_price
                            ).toFixed(2)}
                          </strong>
                        </span>
                      </td>
                      <td data-title="Total">
                        <span>
                          <strong class="element-block price">
                            ₹{item.net_price.toFixed(2)}
                          </strong>
                        </span>
                      </td>
                      <td data-title="Actions">
                        <a href={`/${item.id}/description/${getInstituteId()}`}>
                          <i className="fa fa-fw fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-offset-2 col-sm-10 col-md-offset-6 col-md-6">
              <h2>Order Totals</h2>
              <div class="table-wrap">
                {/* table cart total */}
                <table class="table table-cart-total">
                  <tbody>
                    <tr>
                      <td class="font-lato fw-bold">Subtotal</td>
                      <td>
                        <div class="price">
                          ₹
                          {data[1].product
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
                          ₹
                          {(
                            data[1].product.reduce(
                              (a, curr) =>
                                a +
                                (curr.price_before_coupon
                                  ? curr.price_before_coupon
                                  : 0),
                              0
                            ) - data[1].amount
                          ).toFixed(2)}
                        </div>
                      </td>
                    </tr>

                    <tr className="yellow-border">
                      <td>Total</td>
                      <td>
                        <strong class="price">
                          ₹{data[1].amount.toFixed(2)}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetailsPage;
