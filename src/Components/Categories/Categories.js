import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { categoryId } from "../../States";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    width: "70%",
    backgroundColor: theme.palette.background.paper,
  },
}));
function Categories(props) {
  const classes = useStyles();
  const [catId, setCatId] = useRecoilState(categoryId);
  const [catDetails, setCatDetails] = useState([]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setCatId(newValue);
  };
  let id = new URLSearchParams(props.location.search).get("institute");
  useEffect((id) => {
    fetchCategories(id);
  }, []);

  const fetchCategories = async () => {
    console.log(id);
    try {
      const response = await fetch(
        `http://35.244.8.93:4000/api/users/category/allcategories?institute=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const categoriesDetails = await response.json();
      console.log(response);
      console.log(categoriesDetails);
      setCatDetails(categoriesDetails);
    } catch (error) {
      console.log("CATEGORIES.JS  " + error);
    }
  };

  return (
    <div className={classes.root}>
      {catDetails.length === 0 ? (
        <Skeleton variant="text" />
      ) : (
        <AppBar position="static" color="default">
          <Tabs
            value={catId}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="categories"
          >
            <Tab label="All Categories" value={0} />
            {catDetails.map((category) => (
              <Tab
                label={category.name}
                value={category.id}
                key={category.name}
              />
            ))}
          </Tabs>
        </AppBar>
      )}
    </div>
  );
}

export default withRouter(Categories);
