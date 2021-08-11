import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "antd/dist/antd.less";
import "./styles.css";
import App from "./components";

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
