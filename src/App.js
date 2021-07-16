// import "./App.css";
// import React from "react";
// import Navbar from "./Components/Navbar/Navbar";
// import Banner from "./Components/Banner/Banner";
// import { Route, Switch } from "react-router-dom";
// import ProductDescription from "./Components/Marketplace/ProductDescription";
// import Login from "./Pages/Authentication/Login";

// import GetItemsCart from "./Pages/GetItemsCart";
// import PrivateRoute from "./utils/PrivateRoute";
// import Orders from "./Components/Orders/Orders1";
// import "./App.css";
// import Home from "./Components/Home";
// import PurchasedProduct from "./Components/Marketplace/PurchasedProduct";
// import Register from "./Pages/Authentication/Register";
// import NotFound from "./Components/NotFound";
// import OrderDetails from "./Components/Orders/OrderDetails";

// function App() {
//   return (
//     <div className="App">
//       <Route path="/">
//         <Navbar />
//       </Route>
//       <Route exact path="/">
//         <NotFound />
//       </Route>

//       <Switch>
//         <Route path="/login" exact component={Login} />
//         <Route path="/register" exact component={Register} />

//         <PrivateRoute path="/cart" exact component={GetItemsCart} />
//         <PrivateRoute
//           path="/orders/order-details/:id"
//           exact
//           component={OrderDetails}
//         />
//         <PrivateRoute path="/orders" exact component={Orders} />
//         <PrivateRoute path="/my-courses" exact component={PurchasedProduct} />
//         <Route
//           path="/marketplace/:id/details/:id2"
//           component={ProductDescription}
//         />
//         <Route path="/marketplace">
//           <Banner />

//           <Route
//             path={["/marketplace?institute=inst-id", "/"]}
//             component={Home}
//           />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// export default App;

/**************************           NEW    *********************/
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";

import NewHome from "./Components/newHome";
import NotFound from "./Components/404";
import CourseDescription from "./Components/CourseDescription";
import PurchasedProduct from "./Components/Marketplace/PurchasedProduct";
import { Route, Switch } from "react-router-dom";
import GetItemsCart from "./Pages/GetItemsCart";
import OrderHistory from "./Components/Orders/OrderHistory";
import orderDetailsPage from "./Components/Orders/OrderDetails";
import Courselist from "./Components/Courselist";
// import './App.css';
import Header from "./Components/Header";

function App(props) {
  console.log(props);
  return (
    <div>
      {/* main container of all the page elements */}
      <div id="wrapper">
        {/* header of the page */}
        {/* contain main informative part of the site */}
        <Header />
        <main id="main">
          {/* intro block */}
          <Route exact path="/" component={NotFound} />
          <Switch>
            <Route
              exact
              path="/:id/description/:id2"
              component={CourseDescription}
            />
            <Route path="/course-list/:id" component={Courselist} />
            <Route exact path="/purchased" component={PurchasedProduct} />
            <Route exact path="/cart" component={GetItemsCart} />
            <Route exact path="/orders" component={OrderHistory} />
            <Route
              exact
              path="/orders/:id/details"
              component={orderDetailsPage}
            />

            <Route path="/login" component={Login} />
            <Route path="/:id">
              <NewHome />
            </Route>
            {/* <Route exact path="/:id/courses" component={Courses} /> */}
            <Route exact path="/register" component={Register} />
          </Switch>
        </main>
        {/* footer area container */}
        <div class="footer-area bg-dark text-white">
          {/* aside */}
          <aside class="aside container">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-3 col">
                <div class="logo">
                  <a href="/id">
                    <img
                      src="/images/speedlabs-new-logo.png"
                      id="speedlab-logo"
                      alt="speedlabs"
                    />
                  </a>
                </div>
                <p>
                  We have over 20 years experience providing expert Educational
                  both businesses and individuals. Our Investment Committee
                  brings cades the industry expertise in driving our investment
                  approach. portfolio constructor and allocation
                </p>
                <a href="#" class="btn btn-default text-uppercase">
                  Start Leaning Now
                </a>
              </div>

              <nav class="col-xs-12 col-sm-6 col-md-3 col">
                <h3>Quick Links</h3>
                {/* fooer navigation */}
                <ul class="fooer-navigation list-unstyled">
                  <li>
                    <a href="#">All Courses</a>
                  </li>
                  <li>
                    <a href="#">Summer Sessions</a>
                  </li>
                  <li>
                    <a href="#">Recent Exams</a>
                  </li>
                  <li>
                    <a href="#">Professional Courses</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Use</a>
                  </li>
                  <li>
                    <a href="#">All Courses</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </nav>
              <div class="col-xs-12 col-sm-6 col-md-3 col">
                <h3>contact us</h3>
                <p>
                  If you want to contact us about any issue our support
                  available to help you 8am-7pm Monday to saturday.
                </p>
                {/* ft address */}
                <address class="ft-address">
                  <dl>
                    <dt>
                      <span class="fas fa-map-marker">
                        <span class="sr-only">marker</span>
                      </span>
                    </dt>
                    <dd>Address: 9015 Sunset Boulevard United Kingdom</dd>
                    <dt>
                      <span class="fas fa-phone-square">
                        <span class="sr-only">phone</span>
                      </span>
                    </dt>
                    <dd>
                      Call: <a href="tel:+2156237532">+ 215 623 7532</a>
                    </dd>
                    <dt>
                      <span class="fas fa-envelope-square">
                        <span class="sr-only">email</span>
                      </span>
                    </dt>
                    <dd>
                      Email:{" "}
                      <a href="mailto:info@Studylms.com">info@Studylms.com</a>
                    </dd>
                  </dl>
                </address>
              </div>
            </div>
          </aside>
          {/* page footer */}
          <footer id="page-footer" class="font-lato">
            <div class="container">
              <div class="row holder">
                <div class="col-xs-12 col-sm-push-6 col-sm-6">
                  <ul class="socail-networks list-unstyled">
                    <li>
                      <a href="#">
                        <span class="fab fa-facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="fab fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="fab fa-instagram"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="fab fa-linkedin"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-xs-12 col-sm-pull-6 col-sm-6">
                  <p>
                    <a href="#">Studylms</a> | &copy; 2018{" "}
                    <a href="#">DesignFalls</a>, All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        {/* back top of the page */}
        <span id="back-top" class="text-center fa fa-caret-up"></span>
        {/* loader of the page */}
        {/* <div id="loader" class="loader-holder">
          <div class="block">
            <img src="/images/svg/hearts.svg" width="100" alt="loader" />
          </div>
        </div> */}
      </div>
      <div class="popup-holder">
        <div id="popup1" class="lightbox-demo">
          <form action="#" class="user-log-form">
            <h2>Login Form</h2>
            <div class="form-group">
              <input
                type="text"
                class="form-control element-block"
                placeholder="Username or email address *"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control element-block"
                placeholder="Password *"
              />
            </div>
            <div class="btns-wrap">
              <div class="wrap">
                <label for="rem" class="custom-check-wrap fw-normal font-lato">
                  <input type="checkbox" id="rem" class="customFormReset" />
                  <span class="fake-label element-block">Remember me</span>
                </label>
                <button
                  type="submit"
                  class="btn btn-theme btn-warning fw-bold font-lato text-uppercase"
                >
                  Login
                </button>
              </div>
              <div class="wrap text-right">
                <p>
                  <a href="#" class="forget-link">
                    Lost your Password?
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div id="popup2" class="lightbox-demo">
          <form action="#" class="user-log-form">
            <h2>Register Form</h2>
            <div class="form-group">
              <input
                type="email"
                class="form-control element-block"
                placeholder="Email address *"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control element-block"
                placeholder="Password *"
              />
            </div>
            <div class="btns-wrap">
              <div class="wrap">
                <button
                  type="submit"
                  class="btn btn-theme btn-warning fw-bold font-lato text-uppercase"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
