import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import { RecoilRoot } from "recoil";
ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,

  document.getElementById("root")
);
