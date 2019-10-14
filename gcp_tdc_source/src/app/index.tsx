import React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";
// import 'antd/dist/antd.css';
import "./styles/index.scss";
// import { Factory } from "../lib/source/factory";
// import { apiConfig, serverConfig } from "./config";
// Factory.createConfigAdapter(apiConfig, serverConfig);
ReactDOM.render(<App />, document.getElementById("app"));
