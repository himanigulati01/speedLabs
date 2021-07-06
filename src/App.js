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

import NewHome from "./Components/NewHome";
import NotFound from "./Components/404";
import CourseDescription from "./Components/CourseDescription";

import { Route, Switch } from "react-router-dom";
import GetItemsCart from "./Pages/GetItemsCart";
// import './App.css';

function App(props) {
  console.log(props);
  return (
    <div>
      {/* main container of all the page elements */}
      <div id="wrapper">
        {/* header of the page */}
        <header id="page-header">
          {/* top bar */}
          <div class="top-bar bg-dark text-gray">
            <div class="container">
              <div class="row top-bar-holder">
                <div class="col-xs-9 col">
                  {/* bar links */}
                  <ul class="font-lato list-unstyled bar-links">
                    <li>
                      <a href="tel:+611234567890">
                        <strong class="dt element-block text-capitalize hd-phone">
                          Call :
                        </strong>
                        <strong class="dd element-block hd-phone">
                          +(61) 123 456 7890
                        </strong>
                        <i class="fas fa-phone-square hd-up-phone hidden-sm hidden-md hidden-lg">
                          <span class="sr-only">phone</span>
                        </i>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:&#069;&#120;&#097;&#109;&#112;&#108;&#101;&#064;&#100;&#111;&#109;&#097;&#105;&#110;&#046;&#099;&#111;&#109;">
                        <strong class="dt element-block text-capitalize hd-phone">
                          Email :
                        </strong>
                        <strong class="dd element-block hd-phone">
                          &#069;&#120;&#097;&#109;&#112;&#108;&#101;&#064;&#100;&#111;&#109;&#097;&#105;&#110;&#046;&#099;&#111;&#109;
                        </strong>
                        <i class="fas fa-envelope-square hd-up-phone hidden-sm hidden-md hidden-lg">
                          <span class="sr-only">email</span>
                        </i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-xs-3 col justify-end">
                  {/* user links */}
                  <ul class="list-unstyled user-links fw-bold font-lato">
                    <li>
                      {/* <a href="/login" class="lightbox"> */}
                      <a href="/login">Login</a> <span class="sep">|</span>{" "}
                      <a href="/register">Register</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* header holder */}
          <div class="header-holder">
            <div class="container">
              <div class="row">
                <div class="col-xs-6 col-sm-3">
                  {/* logo */}
                  <div class="logo">
                    <a href="/id">
                      {/* <img
                        class="hidden-xs"
                        src="/images/logo.png"
                        alt="studylms"
                      />
                      <img
                        class="hidden-sm hidden-md hidden-lg"
                        src="/images/logo-dark.png"
                        alt="studylms"
                      /> */}
                      <img src="images/logo-dark.png" alt="studylms"></img>
                    </a>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-9 static-block">
                  {/* nav */}
                  <nav id="nav" class="navbar navbar-default">
                    <div class="navbar-header">
                      <button
                        type="button"
                        class="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false"
                      >
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                    </div>
                    {/* navbar collapse */}
                    <div
                      class="collapse navbar-collapse"
                      id="bs-example-navbar-collapse-1"
                    >
                      {/* main navigation */}
                      <ul class="nav navbar-nav navbar-right main-navigation text-uppercase font-lato">
                        <li class="dropdown">
                          <a
                            href="/id"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            home
                          </a>
                        </li>
                        <li class="dropdown">
                          <a
                            href="/marketplace"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Courses
                          </a>
                        </li>

                        <li class="dropdown">
                          <a
                            href="/"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Orders
                          </a>
                        </li>
                        <li class="dropdown">
                          <a
                            href="/"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Cart
                          </a>
                        </li>
                        <li>
                          <a href="contact.html">coNTACT</a>
                        </li>
                      </ul>
                    </div>
                    {/* navbar form */}
                    <form
                      action="#"
                      class="navbar-form navbar-search-form navbar-right"
                    >
                      <a
                        class="fas fa-search search-opener"
                        role="button"
                        data-toggle="collapse"
                        href="#searchCollapse"
                        aria-expanded="false"
                        aria-controls="searchCollapse"
                      >
                        <span class="sr-only">search opener</span>
                      </a>
                      {/* search collapse */}
                      <div class="collapse search-collapse" id="searchCollapse">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search &hellip;"
                          />
                          <button type="button" class="fas fa-search btn">
                            <span class="sr-only">search</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* contain main informative part of the site */}
        <main id="main">
          {/* intro block */}
          <Route exact path="/" component={NotFound} />
          <Switch>
            <Route path="/cart" component={GetItemsCart} />
            <Route path="/login" component={Login} />
            <Route exact path="/:id">
              <NewHome id="10" />
            </Route>
            {/* <Route exact path="/:id/courses" component={Courses} /> */}
            <Route exact path="/register" component={Register} />

            <Route
              exact
              path="/:id/description/10"
              component={CourseDescription}
            />
          </Switch>
        </main>
        {/* footer area container */}
        <div class="footer-area bg-dark text-gray">
          {/* aside */}
          <aside class="aside container">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-3 col">
                <div class="logo">
                  <a href="/id">
                    <img src="/images/logo.png" alt="studyLMS" />
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
        <div id="loader" class="loader-holder">
          <div class="block">
            <img src="/images/svg/hearts.svg" width="100" alt="loader" />
          </div>
        </div>
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
