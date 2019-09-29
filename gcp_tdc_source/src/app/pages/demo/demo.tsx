import * as React from "react";
import "./demo.scss";
import {
  Layout,
  Breadcrumb,
  Card,
  Input,
  Table,
  Pagination,
  Button,
} from "element-react";
// import { inject, observer } from 'mobx-react';
interface IDemoProps {
  // columns: any[];
  // data: any[];
}
// @inject('router', 'global')
// @observer
export default class DemoPage extends React.Component<
  IDemoProps,
  { columns; data }
> {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          label: "序号",
          type: "index",
        },
        {
          label: "中心名称",
          prop: "name",
        },
      ],
      data: [
        {
          name: "xx",
        },
      ],
    };
  }
  render() {
    return <div className="demo"></div>;
  }
}
