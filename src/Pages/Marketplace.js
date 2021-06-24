import { WarningOutlined } from "@material-ui/icons";

import { withRouter } from "react-router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import MarketplaceView from "../Components/Marketplace/MarketplaceView.component";
import { productDetails } from "../States";
import "../Components/Marketplace/Marketplace.css";
import { getToken } from "../utils";

const Products = (props) => {
  const [products, setProducts] = useRecoilState(productDetails);

  useEffect(() => {
    if (products !== undefined && products.length === 0) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://35.244.8.93:4000/api/users/products/marketplace",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        }
      );
      const productResponse = await response.json();
      console.log(productResponse.products);
      setProducts(productResponse.products);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };

  return (
    <>
      {products === undefined ? (
        <>
          <div>Loading...</div>
          <h2>Sign up first to see your institute courses</h2>
        </>
      ) : (
        <>
          <h1>Top Courses</h1>
          <div className="Marketplace">
            {React.Children.toArray(
              products.map(({ creator_name, ...rest }) => (
                <MarketplaceView
                  creator_initials={creator_name.charAt(0)}
                  creator_name={creator_name}
                  {...rest}
                />
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};
export default withRouter(Products);
