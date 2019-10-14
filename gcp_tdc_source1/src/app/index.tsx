import React from "react";
import * as ReactDOM from "react-dom";

import App from "./app";
// import 'antd/dist/antd.css';
import "./styles/index.scss";
import { getSiteInfo } from "../lib/source/site";
import { ConfigAdapter } from "../lib/source/config";
import { apiConfig } from "./config/api.conf";
const siteInfo = getSiteInfo();
new ConfigAdapter(siteInfo, apiConfig);
ReactDOM.render(<App />, document.getElementById("app"));
