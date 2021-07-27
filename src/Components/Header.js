import React, { useEffect } from "react";
import "./Header.css";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CartLength, inst_id, isLogged } from "../States";
import { getInstituteId, getToken } from "../utils";
import { isLogin, logout } from "../utils";
import { MdLibraryBooks } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { GiBookshelf } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
function Header(props) {
  const [cartlength, setCartlength] = useRecoilState(CartLength);
  const [instId] = useRecoilState(inst_id);
  const [currentUser, setCurrentUser] = useRecoilState(isLogged);

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
                    <li>
                      <a
                        href={
                          getInstituteId()
                            ? `/${getInstituteId()}`
                            : `/${instId}`
                        }
                        className="tooltip"
                      >
                        <AiFillHome style={{ width: "23px", height: "auto" }} />
                        <span className="tooltiptext">Home</span>
                      </a>
                    </li>

                    <li>
                      <a
                        href={
                          getInstituteId()
                            ? `/course-list/${getInstituteId()}`
                            : `/course-list/${instId}`
                        }
                        className="tooltip"
                      >
                        <DashboardIcon
                          style={{ width: "23px", height: "auto" }}
                        />
                        <span className="tooltiptext">All Courses</span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="/cart"
                        className="tooltip"
                        style={{
                          position: "relative",

                          top: "4px",
                        }}
                      >
                        <Badge badgeContent={cartlength} color="primary">
                          <FaShoppingCart
                            style={{
                              position: "relative",
                              bottom: "7px",
                              width: "23px",
                              height: "auto",
                            }}
                          />
                        </Badge>
                        <span className="tooltiptext">Cart</span>
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
                            <a
                              onClick={() => {
                                window.location.reload();
                                logout();
                              }}
                            >
                              <BiLogOut /> LogOut
                            </a>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
