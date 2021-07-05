import React from "react";
import Card from "@material-ui/core/Card";
import { FaFileInvoice } from "react-icons/fa";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BiMinus } from "react-icons/bi";
import "./Order.css";
import Typography from "@material-ui/core/Typography";
const Order = ({ invoice_number, amount, price_before_coupon }) => {
  return (
    <div className="outer-container">
      <Card
        className="Container"
        style={{
          boxShadow:
            "inset 1px 40px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <Typography className="title" color="textSecondary" gutterBottom>
          <span>
            <FaFileInvoice />
          </span>{" "}
          Invoice number: <strong>{invoice_number}</strong>
        </Typography>
        <Typography style={{ color: "green" }}>
          <span>
            <HiOutlineCurrencyRupee />
          </span>{" "}
          Amount: Rs. {amount}
        </Typography>
        {amount - price_before_coupon !== 0 && (
          <Typography style={{ color: "red" }}>
            <span>
              <BiMinus />
            </span>{" "}
            Rs. {price_before_coupon}
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default Order;
