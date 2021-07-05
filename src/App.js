import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import { Route, Switch } from "react-router-dom";
import ProductDescription from "./Components/Marketplace/ProductDescription";
import Login from "./Pages/Authentication/Login";

import GetItemsCart from "./Pages/GetItemsCart";
import PrivateRoute from "./utils/PrivateRoute";
import Orders from "./Components/Orders/Orders1";
import "./App.css";
import Home from "./Components/Home";
import PurchasedProduct from "./Components/Marketplace/PurchasedProduct";
import Register from "./Pages/Authentication/Register";
import NotFound from "./Components/NotFound";
import OrderDetails from "./Components/Orders/OrderDetails";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <Navbar />
      </Route>
      <Route exact path="/">
        <NotFound />
      </Route>

      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

        <PrivateRoute path="/cart" exact component={GetItemsCart} />
        <PrivateRoute
          path="/orders/order-details/:id"
          exact
          component={OrderDetails}
        />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/my-courses" exact component={PurchasedProduct} />
        <Route
          path="/marketplace/:id/details/:id2"
          component={ProductDescription}
        />
        <Route path="/marketplace">
          <Banner />

          <Route
            path={["/marketplace?institute=inst-id", "/"]}
            component={Home}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
