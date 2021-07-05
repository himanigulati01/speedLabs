import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { orderDetails } from "../../States";
import { getToken } from "../../utils";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
// import { Button } from "bootstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    width: "50%",
  },
});

function Row(props) {
  const classes = useRowStyles();
  console.log(props);

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell component="th" scope="row">
          {props.order_id}
        </StyledTableCell>

        <StyledTableCell align="right">{props.invoice_number}</StyledTableCell>
        <StyledTableCell align="right">{props.payment_id}</StyledTableCell>
        <StyledTableCell align="right">{props.issued_on}</StyledTableCell>
        <StyledTableCell align="right">
          <Chip color="primary" size="small" label={props.status} />
        </StyledTableCell>
        <StyledTableCell align="right">{props.mode}</StyledTableCell>
        <StyledTableCell align="right">{props.amount}</StyledTableCell>
        <StyledTableCell align="right">
          <Link to={`/orders/order-details/${props.order_id}`}>
            <RemoveRedEyeOutlinedIcon />
          </Link>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function Orders() {
  const [, setOrders] = useState([]);
  const [data, setData] = useRecoilState(orderDetails);

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
      setOrders(orderJson);
      const orderList = orderArray(orderJson.orders, "order_id");
      console.log(orderList);

      setData(orderList);
    } catch (error) {
      console.log("Order " + error);
    }
  };
  console.log("Data", data);
  return (
    <div
      style={{
        display: "flex",
        placeContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <header id="site-header">
        <div className="container">
          <h1 style={{ padding: "16px 0" }}>Order History</h1>
        </div>
      </header>
      <TableContainer
        component={Paper}
        style={{
          width: "90vw",
          textAlignLast: "center",
          background: "#f7efff",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>InvoiceNo</StyledTableCell>
              <StyledTableCell align="right">Payment Id</StyledTableCell>
              <StyledTableCell align="right">Issued On</StyledTableCell>
              <StyledTableCell align="right">Order Status</StyledTableCell>
              <StyledTableCell align="right">Mode Of Payment</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row
                key={row[0]}
                order_id={row[0]}
                invoice_number={row[1].invoice_number}
                issued_on={row[1].issued_on}
                status={row[1].order_status}
                amount={row[1].amount}
                mode={row[1].method_of_payment}
                payment_id={row[1].payment_id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
