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
  const [, setCartItems] = useRecoilState(cartItemsAdded);
  const [, setPayload] = useRecoilState(cartPayloader);
  const [showLinks, setShowLinks] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(isLogged);

  useEffect(() => {
    setCurrentUser(isLogin());
  }, [setCurrentUser]);

  const [cartlength] = useRecoilState(CartLength);
  return (
    <div className="Navbar">
      <div className="leftSide">
        <Link to="/">
          <img
            src="https://camo.githubusercontent.com/f645dbb403703e322a68b18e5c3a771a015aa63e1a4ebbbfd1cf9bd95f836c32/68747470733a2f2f6d656469612d657870312e6c6963646e2e636f6d2f646d732f696d6167652f4334443042415145776c7837424549623568412f636f6d70616e792d6c6f676f5f3230305f3230302f302f313630393932393937383038323f653d3136333035343038303026763d6265746126743d69417333774469785f58474b4e68664d55693730384a43785353556f39774265566e3079487171576c6d73"
            alt="SpeedLab Logo"
            style={{
              borderRadius: "30%",
            }}
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
                to="/orders"
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
