import { atom } from "recoil";
export const productDetails = atom({
  key: "productDetails",
  default: [],
});
export const UserDetails = atom({
  key: "UserDetails",
  default: {},
});
export const searched = atom({
  key: "searched",
  default: "",
});

export const isLogged = atom({
  key: "isLogin",
  default: false,
});
export const paymentResp = atom({
  key: "paymentResp",
  default: {},
});

export const cartItemsAdded = atom({
  key: "cartItems",
  default: [],
});
export const cartPayloader = atom({
  key: "cart-payloader",
  default: {},
});

export const CartLength = atom({
  key: "cartLength",
  default: 0,
});

export const userEmail = atom({
  key: "user-email",
  default: "",
});
