import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CartLength, isLogged } from "../States";
import { getInstituteId, getToken } from "../utils";
import { isLogin, logout } from "../utils";
import { MdLibraryBooks } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { GiBookshelf } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
function Header(props) {
  //const [cartitems, setCartItems] = useRecoilState(cartItemsAdded);
  const [cartlength, setCartlength] = useRecoilState(CartLength);
  // const [, setPayload] = useRecoilState(cartPayloader);
  // const [showLinks, setShowLinks] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(isLogged);
  // const inst_id = localStorage.getItem("user_inst_id");
  useEffect(() => {
    setCurrentUser(isLogin());
    fetchCartItems();
  }, [setCurrentUser]);
  //const [cartlength] = useRecoilState(CartLength);
  console.log(cartlength);
  console.log(props);
  console.log(currentUser);
  console.log(getInstituteId());

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
      // console.log(cartlength);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
                      1800-419-8902
                    </strong>
                    <i class="fas fa-phone-square hd-up-phone hidden-sm hidden-md hidden-lg">
                      <span class="sr-only">phone</span>
                    </i>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@speedlabs.in">
                    <strong class="dt element-block text-capitalize hd-phone">
                      Email :
                    </strong>
                    <strong class="dd element-block hd-phone">
                      info@speedlabs.in
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
              {!currentUser && (
                <ul class="list-unstyled user-links fw-bold font-lato">
                  <li>
                    {/* <a href="/login" class="lightbox"> */}
                    {/* {} */}
                    <a href="/login">Login</a>
                    {/* <span class="sep"></span>{" "} */}
                  </li>
                </ul>
              )}
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
              <div>
                <a href={`/${getInstituteId()}`}>
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
                  <img
                    src="/images/speedlabs-new-logo.png"
                    id="speedlab-logo"
                    alt="speedlabs"
                  ></img>
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
                      <DashboardIcon />
                      <a href={`/course-list/${getInstituteId()}`}>
                        All Courses
                      </a>
                    </li>

                    <li>
                      <a href="/cart">
                        <Badge badgeContent={cartlength} color="primary">
                          <FaShoppingCart
                            style={{ width: "2em", height: "1.6em" }}
                          />
                        </Badge>
                      </a>
                    </li>

                    {currentUser && (
                      <li class="dropdown">
                        <a
                          href="#"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>
                            <Avatar
                              style={{
                                height: "35px",
                                width: "35px",
                                position: "relative",
                                bottom: "7px",
                              }}
                            />
                          </span>
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <a href="/purchased">
                              <GiBookshelf />
                              My Courses
                            </a>
                          </li>
                          <li class="dropdown">
                            <a href="/orders">
                              <MdLibraryBooks />
                              Orders
                            </a>
                          </li>
                          <li>
                            <a onClick={() => logout()}>
                              <BiLogOut /> LogOut
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
                {/* navbar form */}
                {/* <form
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
                </form> */}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
