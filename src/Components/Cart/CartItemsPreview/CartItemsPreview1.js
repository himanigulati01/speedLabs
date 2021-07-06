// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import "./CartPreview.css";
// import { removeCoupon, removeItem } from "../CartOperations";
// import { productDetails } from "../../../States";
// import { applyCoupon } from "../CartOperations";
// import CancelIcon from "@material-ui/icons/Cancel";
// const CartPreview1 = ({
//   product_id,
//   price_before_coupon,
//   net_price,
//   image_url,
//   image_name,
//   product_name,
//   creator_name,
// }) => {
//   const [products] = useRecoilState(productDetails);
//   const [, setProduct] = useState({});
//   const [coupon, setCoupon] = useState("");

//   useEffect(
//     () => setProduct(products.filter((prod) => prod.id === product_id)[0]),
//     []
//   );

//   return (
//     <>
//       <div class="container">
//         <section id="cart">
//           <article class="product">
//             <header>
//               <a className="remove">
//                 <img
//                   src={image_url}
//                   alt={image_name}
//                   style={{ borderRadius: "50%" }}
//                 />

//                 <h3 onClick={() => removeItem(product_id)}>Remove product</h3>
//               </a>
//             </header>

//             <div class="content">
//               <h1>{product_name}</h1>
//               by {creator_name}
//             </div>

//             <footer class="content">
//               <div className="coupon">
//                 <input
//                   type="text"
//                   name=""
//                   placeholder="Coupon code"
//                   style={{ height: "inherit" }}
//                   onChange={(event) => setCoupon(event.target.value)}
//                 />
//                 <button
//                   className="removebtn"
//                   // style={{
//                   //   display: "inline",
//                   //   height: "inherit",
//                   //   backgroundColor: "#db3737",
//                   //   width: "6rem",
//                   //   margin: "0 0px",
//                   //   "&:hover": {
//                   //     backgroundColor: "red",
//                   //   },
//                   // }}
//                   onClick={() => removeCoupon(product_id)}
//                 >
//                   <CancelIcon />
//                 </button>
//               </div>
//               <button
//                 className="btn"
//                 style={{
//                   display: "inline",
//                   height: "inherit",
//                   width: "6rem",
//                   margin: "0 0px",
//                 }}
//                 onClick={() => applyCoupon(product_id, coupon)}
//               >
//                 Apply
//               </button>
//               <h2 class="full-price">
//                 {price_before_coupon - net_price !== 0 && (
//                   <>
//                     <span
//                       style={{
//                         textDecoration: "line-through",
//                         margin: "0 5px 0 0",
//                       }}
//                     >
//                       Rs. {price_before_coupon}
//                     </span>
//                     <div
//                       style={{
//                         borderLeft: "1px solid #78cb63",
//                         height: "inherit",
//                         display: "inline",
//                         marginRight: "5px",
//                       }}
//                     ></div>
//                   </>
//                 )}
//                 Rs. {net_price}
//               </h2>{" "}
//             </footer>
//           </article>
//         </section>
//       </div>

//       {/* <footer id="site-footer">
//         <div class="container clearfix">
//           <div class="left">
//             <h2 class="subtotal">
//               Subtotal: <span>163.96</span>€
//             </h2>
//             <h3 class="tax">
//               Taxes (5%): <span>8.2</span>€
//             </h3>
//             <h3 class="shipping">
//               Shipping: <span>5.00</span>€
//             </h3>
//           </div>

//           <div class="right">
//             <h1 class="total">
//               Total: <span>177.16</span>€
//             </h1>
//             <a class="btn">Checkout</a>
//           </div>
//         </div>
//       </footer> */}
//     </>
//   );
// };

// export default CartPreview1;



import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./CartPreview.css";
import { removeCoupon, removeItem } from "../CartOperations";
import { productDetails } from "../../../States";
import { applyCoupon } from "../CartOperations";



const CartPreview1 = ({
  product_id,
  price_before_coupon,
  net_price,
  image_url,
  image_name,
  product_name,
  creator_name,
}) => {
  const [products] = useRecoilState(productDetails);
  const [, setProduct] = useState({});
  const [coupon, setCoupon] = useState("");

  useEffect(
    () => setProduct(products.filter((prod) => prod.id === product_id)[0]),
    []
  );

  return (
    <>

      
    
    </>
  );
};

export default CartPreview1;
