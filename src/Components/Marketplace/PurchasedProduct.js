// import React, { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { purchasedProducts } from "../../States";
// import { getToken } from "../../utils";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";

// import { Link } from "react-router-dom";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";

// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import CardActions from "@material-ui/core/CardActions";
// import { Divider, Grid } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     background: "#f7efff",
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   root: {
//     width: "300px",
//     margin: "55px",
//     marginTop: "10px",
//     background: "#f2f2f2",
//     fontFamily: "math",
//     opacity: " 0.89",
//     boxShadow:
//       "0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)",
//     "&:hover": {
//       boxShadow:
//         "7px 4px 29px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)",
//       transform: "scale(1.02)",
//       opacity: " 1",
//     },
//     overflow: "hidden",
//     textDecoration: "none",
//   },
//   media: {
//     paddingTop: "56.25%",
//     display: "block",
//     width: "100%",
//     height: "auto",

//     // 16:9
//   },
//   overlay: {
//     position: "absolute",
//     bottom: "0",
//     background: "rgba(0, 0, 0, 0.5)" /* Black see-through */,
//     color: "#f1f1f1",
//     width: "100%",
//     transition: ".5s ease",
//     opacity: "0",
//     fontSize: "20px",
//     padding: "20px",
//     textAlign: "center",
//   },

//   text: {
//     textDecoration: "none",
//   },

//   paragharph: {
//     overflow: "hidden",
//   },

//   // Boxshadow: "0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%)"
// }));

// const PurchasedProduct = () => {
//   const classes = useStyles();
//   const [purchasedProduct, setPurchasedProduct] =
//     useRecoilState(purchasedProducts);

//   useEffect(() => fetchPublishedProducts(), []);
//   const fetchPublishedProducts = async () => {
//     try {
//       const response = await fetch(
//         `http://35.244.8.93:4000/api/users/product`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: getToken(),
//           },
//         }
//       );
//       const productResponse = await response.json();
//       const products = await productResponse.products;
//       console.log(response);
//       console.log(productResponse.products);
//       setPurchasedProduct(products);
//     } catch (error) {
//       console.log("Marketplace" + error);
//     }
//   };

//   return (
//     <>
//       <header id="site-header">
//         <div class="container">
//           <h1 style={{ padding: "100x 0" }}>My Courses</h1>
//         </div>
//       </header>
//       <div className={classes.container}>
//         {purchasedProduct.map((product) => (
//           <Grid>
//             <Card className={classes.root}>
//               <Link
//                 // to={`/marketplace/${product.id}/details/${product.instid}`}
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 <CardMedia
//                   className={classes.media}
//                   image={product.image_url}
//                   title={product.image_name}
//                 />

//                 <CardContent className={classes.text}>
//                   <Typography variant="h6" gutterBottom>
//                     {product.product_name}
//                   </Typography>

//                   <Typography
//                     paragraph
//                     color="inherit"
//                     className={classes.paragharph}
//                   >
//                     {product.short_description}
//                   </Typography>
//                   <Typography paragraph>Rs {product.price}</Typography>
//                 </CardContent>
//               </Link>

//               <Divider />
//               <CardActions>
//                 <Button size="small" color="primary">
//                   Start Learning
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </div>
//     </>
//   );
// };
// export default PurchasedProduct;

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Loader from '../../loader'
import MessageBox from "../../MessageBox";
import { purchasedProducts } from "../../States";
import { getToken } from "../../utils";

function PurchasedProduct(params) {

  const [purchasedProduct, setPurchasedProduct] = useRecoilState(purchasedProducts);
  const [loading, setLoading] = useState(false);
  const [errorPurchase, setError] = useState("");

  useEffect(() => fetchPublishedProducts(), []);

  const fetchPublishedProducts = async () => {
    try {
      if(!purchasedProduct)
          setLoading(true);
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const productResponse = await response.json();
      const products = await productResponse.products;
      console.log(response);
      console.log(productResponse.products);
      setPurchasedProduct(products);
      setLoading(false);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };

  return(
    <div>
			{/* heading banner */}
			{/* breadcrumb nav */}
			<nav class="breadcrumb-nav">
				<div class="container">
					{/* breadcrumb */}
					<ol class="breadcrumb">
						<li><a href="course-single.html">Home</a></li>
						<li class="active">PurchasedProducts</li>
					</ol>
          <div>
				<div class="container holder">
					<div class="align">
          <h1>Purchased Products</h1>
					</div>
				</div>
			</div>
				</div>
			</nav>
			{/* upcoming events block */}
      {loading && <Loader></Loader>}
      {errorPurchase && <MessageBox variant="danger">{errorPurchase}</MessageBox>}
      { purchasedProduct &&
			<section class="upcoming-events-block container">
				{/* upcoming events list */}
				<ul class="list-unstyled upcoming-events-list">
        {purchasedProduct.map((product) => (
					<li>
						<div class="alignleft">
							<img src={product.image_url} alt="image description"/>
						</div>
						<div class="description-wrap">
							<h3 class="list-heading"><a href="event-sigle.html">{product.product_name}</a></h3>
							<h5>Price: {product.discount ? <strike>₹{product.price}</strike>:<></>}
							&nbsp;&nbsp;₹{parseFloat(product.price - (product.discount*product.price)/100).toFixed(2)}</h5>
              <h5>OverView: </h5>
              <p>{product.short_description}</p>

							<a href="event-sigle.html" class="btn btn-default text-uppercase">Details and Contents</a>
						</div>
					</li>
        ))}
				
				</ul>

			</section>}
		</div>
  )
  
}

export default PurchasedProduct
