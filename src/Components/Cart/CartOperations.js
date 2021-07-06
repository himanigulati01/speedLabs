import { getToken } from "../../utils";
import { Alert } from "@material-ui/lab";
//Cart OPERATIONS
//ADD TO CART
//REMOVE ITEM FROM CART
//DELETE CART
//REMOVE COUPON
//APPLY COUPON

export const addToCart = async (productId) => {
  try {
    const item = { product_id: productId };
    const response = await fetch(
      "http://35.244.8.93:4000/api/users/cart/addtocart",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const addToCartResponse = await response.json();
    alert("Item added to Cart");
    console.log(addToCartResponse);
  } catch (error) {
    console.log("AddtoCart " + error);
  }
};

export const removeItem = async (id) => {
  try {
    const response = await fetch(
      `http://35.244.8.93:4000/api/users/cart/${id}/remove`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const removeItem = await response.json();
    console.log("REMOVE ITEM ", removeItem);
    alert(removeItem.msg);
  } catch (error) {
    console.log("REMOVE ITEM ERROR " + error);
  }
};

export const deleteCart = async () => {
  try {
    const response = await fetch(
      `http://35.244.8.93:4000/api/users/cart/emptycart`,
      {
        method: "DEL",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const removeItem = await response.json();
    console.log("CART DELETED" + removeItem);
  } catch (error) {
    console.log("CART DELETED ERROR: " + error);
  }
};
export const removeCoupon = async (id, coupon) => {
  try {
    const response = await fetch(
      `http://35.244.8.93:4000/api/users/cart/${id}/removecoupon`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const removeCoupon = await response.json();
    alert("Coupon Removed");
    console.log("COUPON REMOVED", removeCoupon);
  } catch (error) {
    console.log("COUPON REMOVED ERROR: " + error);
  }
};


export const applyCoupon = async (id, coupon) => {
  try {
    const response = await fetch(
      `http://35.244.8.93:4000/api/users/cart/${id}?apply=${coupon}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );
    const applyCoupon = await response.json();
    if (applyCoupon.flag === 2) {
      <Alert severity="error">{applyCoupon.errors}</Alert>;
    }
    alert("Coupon Added");

    console.log("COUPON ADDED", applyCoupon);
  } catch (error) {
    console.log("COUPON ADDED ERROR: " + error);
  }
};
