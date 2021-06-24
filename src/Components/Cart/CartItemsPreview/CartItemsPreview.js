import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { productDetails } from "../../../States";
import { removeCoupon, removeItem } from "../CartOperations";
import { applyCoupon } from "../CartOperations";
import "./CartItemsPreview.css";

const CartItemsPreview = ({ product_id, price_before_coupon, net_price }) => {
  const [products] = useRecoilState(productDetails);
  const [product, setProduct] = useState({});
  const [coupon, setCoupon] = useState("");

  useEffect(
    () => setProduct(products.filter((prod) => prod.id === product_id)[0]),
    []
  );

  return (
    <div className="wrapper">
      <div id="c1" className="image-content">
        <img src={product?.image_url} alt="product_image" />
      </div>

      <div id="c2" className="description-content">
        <h2>{product.product_name}</h2>
        <p>by {product.creator_name}</p>
      </div>

      <div id="c3" className="amount-content">
        <h3>Amount: Rs.{net_price}</h3>
        {price_before_coupon - net_price !== 0 && (
          <h3>Rs.{price_before_coupon - net_price} Off</h3>
        )}

        <div className="coupon-input">
          <TextField
            label="Apply Coupon"
            onChange={(event) => setCoupon(event.target.value)}
          />
        </div>

        <div className="coupon-action">
          <Button
            className="border-button"
            variant="outlined"
            color="inherit"
            type="submit"
            onClick={() => applyCoupon(product_id, coupon)}
          >
            Apply
          </Button>

          <Button
            className="border-button"
            style={{ marginTop: "7px" }}
            variant="contained"
            color="default"
            type="submit"
            onClick={() => removeCoupon(product_id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <RemoveCircleOutlineIcon onClick={() => removeItem(product.id)} />
    </div>
  );
};

export default CartItemsPreview;
