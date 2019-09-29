import React from "react";
import { Layout, Menu } from "element-react";
import { Link } from "react-router-dom";
import "./slide-menu.scss";
interface SlideProps {
  //
}
export default class SlideMenu extends React.Component<SlideProps, any> {
  constructor(props: any) {
    super(props);
  }
  public onSelect(
    index?: string | undefined,
    indexPath?: string[] | undefined
  ) {
    console.log(index, indexPath);
  }
  public onClose() {
    //
  }
  render() {
    return (
      <div>
        <div className="head-logo">Trial.Link</div>

        <Menu
          defaultActive="2"
          className="el-menu-vertical-demo"
          theme="dark"
          style={{ paddingTop: "10px" }}
          onSelect={this.onSelect.bind(this)}
        >
          <Link to="gcpmgr" key="gcpmgr">
            <Menu.Item index="gcpmgr">协会列表</Menu.Item>
          </Link>
          <Link to="gcpmgr_sites" key="gcpmgr_sites">
            <Menu.Item index="gcpmgr_sites">中心列表</Menu.Item>
          </Link>
          <Menu.Item index="3">申办方列表</Menu.Item>
          <Menu.Item index="4">用户管理</Menu.Item>
          <Menu.Item index="5">角色类型</Menu.Item>
          <Menu.Item index="6">匹配审核</Menu.Item>
          <Menu.Item index="7">招募审核</Menu.Item>
          <Menu.Item index="8">问卷审核</Menu.Item>
          <Menu.Item index="9">问卷列表</Menu.Item>
          <Menu.Item index="10">中心轮播</Menu.Item>
          <Menu.Item index="11">反馈列表</Menu.Item>
          <Menu.Item index="12">合作需求</Menu.Item>
          <Menu.Item index="13">日志管理</Menu.Item>
        </Menu>
      </div>
    );
  }
}
