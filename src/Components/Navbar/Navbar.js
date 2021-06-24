import { ReorderOutlined, SearchOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";

import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  cartItemsAdded,
  CartLength,
  cartPayloader,
  isLogged,
} from "../../States";
import { isLogin, logout } from "../../utils";
import "./Navbar.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Navbar = (props) => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);
  const [payload, setPayload] = useRecoilState(cartPayloader);
  const [showLinks, setShowLinks] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(isLogged);

  useEffect(() => {
    setCurrentUser(isLogin());
  }, []);

  const [cartlength] = useRecoilState(CartLength);
  return (
    <div className="Navbar">
      <div className="leftSide">
        <Link to="/">
          <img
            src="	https://www.speedlabs.in/images/logo.svg"
            alt="SpeedLab Logo"
          />
        </Link>
        <input type="text" placeholder="Search" />
        <button>
          <SearchOutlined />
        </button>
      </div>
      <div className="rightSide">
        <div className="Links" id={showLinks ? "hidden" : ""}>
          {currentUser ? (
            <>
              <NavLink
                to="/"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6d3088",
                }}
              >
                OrderHistory
              </NavLink>
              <NavLink
                to="/cart"
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6d3088",
                }}
              >
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartlength} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </NavLink>

              <Button
                variant="text"
                color="default"
                onClick={() => {
                  logout();
                  setCurrentUser(false);
                  setCartItems([]);
                  setPayload({});
                }}
              >
                <ExitToAppIcon />
              </Button>
            </>
          ) : (
            <NavLink
              to="/register"
              activeStyle={{
                fontWeight: "bold",
                color: "#6d3088",
              }}
            >
              Signup
            </NavLink>
          )}
        </div>
        <div className="Button" onClick={() => setShowLinks(!showLinks)}>
          <ReorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
