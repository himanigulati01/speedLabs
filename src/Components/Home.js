import React from "react";
import Marketplace from "../Pages/Marketplace";
import Categories from "./Categories/Categories";
import "./Home.css";
const Home = () => {
  let getCat = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="Categories-tabs">
        <Categories id={getCat} />
      </div>
      <Marketplace />
    </>
  );
};

export default Home;
