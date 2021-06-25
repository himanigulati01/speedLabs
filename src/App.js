import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import Marketplace from "./Pages/Marketplace";
import { Route, Switch } from "react-router-dom";

import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import GetItemsCart from "./Pages/GetItemsCart";
import PrivateRoute from "./utils/PrivateRoute";
import Order from "./Components/Orders/Order";

function App() {
  return (
    <>
      <Route path="/" component={Navbar} />
      <Switch>
        <PrivateRoute path="/cart" exact component={GetItemsCart} />
        <PrivateRoute path="/orders" exact component={Order} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path={["/courses", "/"]}>
          <Banner />
          <Marketplace />
        </Route>
      </Switch>
    </>
  );
}

export default App;
