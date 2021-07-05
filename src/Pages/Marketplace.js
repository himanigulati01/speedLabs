import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import MarketplaceView from "../Components/Marketplace/MarketplaceView.component";
import { categoryId, inst_id, productDetails, searched } from "../States";
import "./Marketplace.css";

import Loading from "../Components/Loading";

const Products = (props) => {
  const id = new URLSearchParams(props.location.search).get("institute");
  const instid = id;
  const [, setInstituteId] = useRecoilState(inst_id);
  setInstituteId(instid);
  const [visible, setvisible] = useState(6);
  const [products, setProducts] = useRecoilState(productDetails);
  const [searcheTerm] = useRecoilState(searched);
  const [category_id] = useRecoilState(categoryId);

  useEffect(() => {
    if (products !== undefined && products.length === 0) {
      fetchProducts();
    }
  }, []);
  console.log(products.length + 1);
  console.log(visible);
  console.log(products.length + 1 === visible);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/product/marketplace?institute=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const productResponse = await response.json();

      console.log(response);
      console.log(productResponse.products);
      setProducts(productResponse.products);
    } catch (error) {
      console.log("Marketplace" + error);
    }
  };

  const showMore = () => {
    setvisible((prevState) => prevState + 3);
  };

  const data = products
    ?.filter((val) => {
      if (searcheTerm === "") {
        return val;
      } else if (
        val.product_name.toLowerCase().includes(searcheTerm.toLowerCase())
      ) {
        return val;
      }
    })
    .slice(0, visible)
    .map(({ creator_name, ...rest }) => {
      return category_id === rest.category || category_id === 0 ? (
        <MarketplaceView
          key={rest.id}
          creator_initials={creator_name.charAt(0)}
          creator_name={creator_name}
          instid={instid}
          {...rest}
        />
      ) : null;
    });

  const classNone = products.length === visible ? " None" : "";

  return (
    <div className="Container-marketplace">
      {products === undefined || products === [] || products.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <h1>
            Courses <LocalLibraryIcon />
          </h1>
          <div className="Marketplace">{data}</div>
          <button class={"custom-btn btn-9" + classNone} onClick={showMore}>
            More
          </button>
        </>
      )}
    </div>
  );
};
export default withRouter(Products);
