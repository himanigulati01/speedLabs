// import "../Components/Cart/CartItemsPreview/CartPreview.css";

// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Alert from "@material-ui/lab/Alert";
// import Typography from "@material-ui/core/Typography";
// import CartItemsPreview1 from "../Components/Cart/CartItemsPreview/CartItemsPreview1";
// import "./GetItemsCart.css";
// import RazorpayButton from "../paymentGateway/RazorpayButton";
// import {
//   cartItemsAdded,
//   CartLength,
//   cartPayloader,
//   productDetails,
//   paymentResp,
// } from "../States";
// import { getToken } from "../utils";
// import Loading from "../Components/Loading";

// const GetItemsCart = () => {
//   const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
//   const [paymentResponse, setPaymentResponse] = useRecoilState(paymentResp);
//   const [payloader, setPayloader] = useRecoilState(cartPayloader);
//   const [products, setProducts] = useRecoilState(productDetails);
//   const [, setCartlength] = useRecoilState(CartLength);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (products.length === 0) {
//       fetchProducts();
//     }
//   }, []);

//   useEffect(() => {
//     fetchCartItems();
//   }, [products]);

//   //fetching products in case user come directly to cart
//   //if not, then recoil state product
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(
//         "http://35.244.8.93:4000/api/users/products/marketplace",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: getToken(),
//           },
//         }
//       );
//       const productResponse = await response.json();
//       setProducts(productResponse.products);
//       console.log(productResponse);
//     } catch (error) {
//       console.log("Marketplace" + error);
//     }
//   };
//   //fetching products in case user come directly to cart

//   //fetching Cart Items
//   const fetchCartItems = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch("http://35.244.8.93:4000/api/users/cart", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: getToken(),
//         },
//       });
//       const jsonResponse = await response.json();
//       //navbar cart length issue
//       setCartlength(jsonResponse.cartItems.Items.length);
//       setCartItems(jsonResponse.cartItems.Items);
//       console.log(jsonResponse.Items);
//       setPayloader(jsonResponse.cartItems);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//     }
//   };

//   const handleSuccessPayment = async (payment_id, signature) => {
//     try {
//       const response = await fetch(
//         "http://35.244.8.93:4000/api/users/cart/razorpay",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: getToken(),
//           },
//         }
//       );
//       const paymentRes = await response.json();
//       setPaymentResponse(paymentRes.details);
//       console.log(paymentResponse);
//       console.log(payment_id);
//       const item = {
//         payment_id: payment_id,
//         order_id: paymentRes.details.id,
//       };
//       console.log(item);
//       console.log(signature);
//       postData(
//         payment_id,
//         paymentRes.details.id,
//         paymentRes.details.amount,
//         signature
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const postData = async (payment_id, order_id, amount, signature) => {
//     const item = {
//       payment_id: payment_id,
//       order_id: order_id,
//       payment_secret: "S&xd!rstpLw!+w#u$EDnY_K^=UCah-?EBncknj35",
//       amount: amount,
//       currency: "INR",
//       receipt: "FDSJKI",
//     };
//     try {
//       const response = await fetch(
//         "http://35.244.8.93:4000/api/users/cart/checkout",
//         {
//           method: "POST",
//           body: JSON.stringify(item),
//           headers: {
//             "x-razorpay-signature": signature,
//             "Content-Type": "application/json",
//             Authorization: getToken(),
//           },
//         }
//       );
//       const paymentRes2 = await response.json();
//       console.log("res2", paymentRes2);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div style={{ background: "#f7efff", height: "100%" }}>
//       <header id="site-header">
//         <div className="container">
//           <h1 style={{ padding: "16px 0" }}>Shopping cart</h1>
//         </div>
//       </header>
//       {(isLoading || cartItems === []) && (
//         <div>
//           <Loading />
//         </div>
//       )}
//       {payloader.total_amt === 0 && (
//         <Alert
//           icon={false}
//           severity="success"
//           style={{ placeContent: "center" }}
//         >
//           Empty Cart!!! Go to Marketplace and get some.
//         </Alert>
//       )}
//       {payloader.total_amt > 0 && (
//         <div classNameName="Cart">
//           <div classNameName="Cart-items">
//             {cartItems.map(({ ...otherCollectionProps }, index) => (
//               <CartItemsPreview1 key={index} {...otherCollectionProps} />
//             ))}
//           </div>
//           <Card classNameName="Total">
//             <CardContent>
//               <Typography color="textSecondary" gutterBottom>
//                 Total Amount
//               </Typography>

//               <Typography variant="h5" component="h2">
//                 Rs.{payloader.total_amt}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <RazorpayButton
//                 amount={payloader.total_amt * 100}
//                 order_id={paymentResponse.id}
//                 onSuccess={handleSuccessPayment}
//               />
//             </CardActions>
//           </Card>
//         </div>
//       )}
//       )
//     </div>
//   );
// };

// export default GetItemsCart;

/*************************         NEW  ******************************/

//

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import RazorpayButton from "../paymentGateway/RazorpayButton";
import "./Cart.css";
import {
  cartItemsAdded,
  CartLength,
  cartPayloader,
  productDetails,
  paymentResp,
} from "../States";

import { getToken } from "../utils";

function GetItemsCart(params) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
  const [paymentResponse, setPaymentResponse] = useRecoilState(paymentResp);
  const [payloader, setPayloader] = useRecoilState(cartPayloader);
  const [products, setProducts] = useRecoilState(productDetails);
  const [, setCartlength] = useRecoilState(CartLength);

  useEffect(() => {
    fetchCartItems();
  }, [products]);

  //fetching products in case user come directly to cart
  //if not, then recoil state product
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://35.244.8.93:4000/api/users/products/marketplace",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: getToken(),
  //         },
  //       }
  //     );
  //     const productResponse = await response.json();
  //     setProducts(productResponse.products);
  //     console.log(productResponse);
  //   } catch (error) {
  //     console.log("Marketplace" + error);
  //   }
  // };
  //fetching products in case user come directly to cart

  //fetching Cart Items
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://35.244.8.93:4000/api/users/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const jsonResponse = await response.json();
      //navbar cart length issue
      setCartlength(jsonResponse.cartItems.Items.length);
      setCartItems(jsonResponse.cartItems.Items);
      console.log(jsonResponse);
      setPayloader(jsonResponse.cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSuccessPayment = async (payment_id, signature) => {
  //   try {
  //     const response = await fetch(
  //       "http://35.244.8.93:4000/api/users/cart/razorpay",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: getToken(),
  //         },
  //       }
  //     };
  //     const postData = async (payment_id, order_id, amount, signature) => {
  //       const item = {
  //         payment_id: payment_id,
  //         order_id: order_id,
  //         payment_secret: "S&xd!rstpLw!+w#u$EDnY_K^=UCah-?EBncknj35",
  //         amount: amount,
  //         currency: "INR",
  //         receipt: "FDSJKI",
  //       };
  //       try {
  //         const response = await fetch(
  //           "http://35.244.8.93:4000/api/users/cart/checkout",
  //           {
  //             method: "POST",
  //             body: JSON.stringify(item),
  //             headers: {
  //               "x-razorpay-signature": signature,
  //               "Content-Type": "application/json",
  //               Authorization: getToken(),
  //             },
  //           }
  //         );
  //         const paymentRes2 = await response.json();
  //         console.log("res2", paymentRes2);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     );
  //     const paymentRes2 = await response.json();
  //     console.log("res2", paymentRes2);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div>
        {/* heading banner */}
        <header class="heading-banner text-white bgCover">
          <div class="container holder">
            <div class="align">
              <h1>Cart Page</h1>
            </div>
          </div>
        </header>
        {/* breadcrumb nav */}
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
              <li class="active">Cart Page</li>
            </ol>
          </div>
        </nav>
        {/* cart content block */}
        <section class="cart-content-block container">
          {/* cart form */}
          <form action="#" class="cart-form">
            <div class="table-wrap">
              {/* cart data table */}
              <table class="table tab-full-responsive cart-data-table font-lato">
                <thead class="hidden-xs">
                  <tr>
                    <th>&nbsp;</th>
                    <th class="col01">Product</th>
                    <th>Price</th>
                    <th>Apply Coupon</th>
                    <th>Discount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="#" class="btn-remove fas fa-times">
                        <span class="sr-only">remove</span>
                      </a>
                    </td>
                    <td data-title="Product" class="col01">
                      <div>
                        <div class="pro-name-wrap">
                          <div class="alignleft no-shrink hidden-xs">
                            <img
                              src="http://placehold.it/45x50"
                              alt="image description"
                            />
                          </div>
                          <div class="descr-wrap">
                            <h3 class="fw-normal">Wirebound Notebook</h3>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-title="Price">
                      <span>
                        <strong class="price element-block"> $65558.00</strong>
                      </span>
                    </td>
                    <td data-title="Apply coupon">
                      <div>
                        <div className="quantity">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Coupon Code"
                          />
                          <button className="apply-coupon">Apply</button>
                          <button className="remove-coupon">Remove</button>
                        </div>
                      </div>
                    </td>
                    <td data-title="Discount">
                      <span>
                        <strong class="price element-block"> $68.00</strong>
                      </span>
                    </td>
                    <td data-title="Total">
                      <span>
                        <strong class="element-block price"> $68.00</strong>
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2" class="text-right btn-actions">
                      <div>
                        <a
                          href="#"
                          class="btn btn-default font-lato fw-normal text-uppercase"
                        >
                          Back to courses
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-offset-2 col-sm-10 col-md-offset-6 col-md-6">
                <h2>Cart Totals</h2>
                <div class="table-wrap">
                  {/* table cart total */}
                  <table class="table table-cart-total">
                    <tbody>
                      <tr>
                        <td class="font-lato fw-bold">Subtotal</td>
                        <td>
                          <div class="price">£95.00</div>
                        </td>
                      </tr>
                      <tr>
                        <td class="font-lato fw-bold">Discount</td>
                        <td>
                          <div lass="price">£95.00</div>
                        </td>
                      </tr>

                      <tr>
                        <td>Total</td>
                        <td>
                          <strong class="price">$105.00</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  type="submit"
                  class="btn btn-warning btn-theme font-lato fw-bold text-uppercase element-block"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default GetItemsCart;
