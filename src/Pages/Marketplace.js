import { withRouter } from "react-router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import MarketplaceView from "../Components/Marketplace/MarketplaceView.component";
import { productDetails, searched } from "../States";
import "../Components/Marketplace/Marketplace.css";
import { getToken } from "../utils";

const Products = (props) => {
  const [products, setProducts] = useRecoilState(productDetails);
  const [searcheTerm] = useRecoilState(searched);

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
          <h1>
            Top Courses <LocalLibraryIcon />
          </h1>
          <div className="Marketplace">
            {products
              .filter((val) => {
                if (searcheTerm === "") {
                  return val;
                } else if (
                  val.product_name
                    .toLowerCase()
                    .includes(searcheTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map(({ creator_name, ...rest }) => (
                <MarketplaceView
                  key={rest.id}
                  creator_initials={creator_name.charAt(0)}
                  creator_name={creator_name}
                  {...rest}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default withRouter(Products);
