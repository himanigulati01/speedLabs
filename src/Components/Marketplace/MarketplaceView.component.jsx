import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CardActions from "@material-ui/core/CardActions";
import { Divider, Grid } from "@material-ui/core";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { withRouter } from "react-router-dom";

import { addToCart } from "../Cart/CartOperations";
import { getInstituteId } from "../../utils";
import { cartItemsAdded, CartLength } from "../../States";
import { getToken } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "300px",
    margin: "55px",
    marginTop: "10px",
    background: "#f2f2f2",
    fontFamily:"math",
    boxShadow: "0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)",
    '&:hover': {
      boxShadow: "7px 4px 29px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)",
      transform: "scale(1.02)"
    },
    overflow:"hidden",
  
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
     // 16:9
   
  },
  avatar: {
    backgroundColor: red[500],
  },
  text: {
    textDecoration: "none",
  },
  disable: {
    color: red,
  },
  paragharph:{
    overflow: "hidden",
    whiteSpace:" nowrap",
    textOverflow: "ellipsis"
  }
  // Boxshadow: "0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)"
}));

function MarketplaceView(props) {
  const classes = useStyles();
  const product_id = props.id;
  const [length, setLength] = useRecoilState(CartLength);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAdded);

  useEffect(() => {
    fetchCartItems();
  }, []);

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
      setLength(jsonResponse.cartItems.Items.length);
      setCartItems(jsonResponse.cartItems.Items);
    } catch (error) {
      console.log("Marketplace.component.jsx cartItems", error);
    }
  };
  const addItemToCart = (id) => {
    console.log(id);
    addToCart(id);
    setLength(length + 1);
  };
  return (
    <Grid>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label={props.product_name} className={classes.avatar}>
              {props.creator_initials}
            </Avatar>
          }
          title={props.product_name}
          subheader={props.creator_name}
        />

        <CardMedia
          className={classes.media}
          image={props.image_url}
          title={props.image_name}
        />

        <CardContent className={classes.text}>
          
          <Typography paragraph className={classes.paragharph}>{props.you_will_learn}</Typography>
          <Typography paragraph>Rs {props.price}</Typography>
        </CardContent>

        <Divider />

        <CardActions>
          {props.issued_by === parseInt(getInstituteId()) ? (
            <Button
              size="small"
              color="primary"
              disabled={
                cartItems.filter((item) => item.product_id === product_id)
                  .length === 1
              }
              onClick={() => addItemToCart(product_id)}
            >
               <AddShoppingCartIcon/>
            </Button>
          ) : (
            <Button size="small" color="primary">
              Learn More
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
export default withRouter(MarketplaceView);
