import * as React from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Input,
  Table,
  Pagination,
  Button,
} from "element-react";
import { setTheme } from "../styles/set-theme";

export default class BasePage extends React.Component {
  constructor(props) {
    super(props);
    setTheme("00C587");
  }
}
