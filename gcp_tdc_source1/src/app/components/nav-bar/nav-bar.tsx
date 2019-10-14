import React from "react";
import { Layout, Menu } from "element-react";
import { Link } from "react-router-dom";
import "./nav-bar.scss";
import { Dropdown, Button } from "element-react";
import { THEME, getTheme } from "../../core/constant";
import { themeList } from "../../styles/set-theme";

interface NavBarProps {
  //
}
export default class NavBarComp extends React.Component<{}, NavBarProps> {
  colorValue: string;
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public onSelect(index: number, indexPath: string) {
    console.log(index, indexPath);
  }
  public onClose() {
    //
  }
  componentDidMount() {
    this.setState({
      colorValue: getTheme(),
    });
  }
  render() {
    return (
      <div className="nav-bar clearfix">
        <div className="fr"></div>
        <div className="fr flex">
          <Menu defaultActive="1" className="el-menu-demo" mode="horizontal">
            <Menu.Item index="1">数据库</Menu.Item>
            <Menu.Item index="2">项目</Menu.Item>
            <Menu.Item index="3">资讯</Menu.Item>
          </Menu>
          <div style={{ minWidth: "180px" }}>
            <Dropdown
              trigger="click"
              style={{ width: "100%" }}
              menu={
                <Dropdown.Menu>
                  <Dropdown.Item>账户设置</Dropdown.Item>
                  <Dropdown.Item>
                    <Layout.Row>
                      {themeList.map((th: { key: string; name: string }) => {
                        return (
                          <Layout.Col span="12" key={th.key}>
                            <Button
                              size="mini"
                              type={
                                getTheme() === th.key ? "primary" : undefined
                              }
                            >
                              {th.name}
                            </Button>
                          </Layout.Col>
                        );
                      })}
                    </Layout.Row>
                  </Dropdown.Item>
                  <Dropdown.Item>退出登录</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <span className="flex accunt__modify">
                <img src={require("../../../static/img/yhmrtx_icon.png")}></img>
                <span>
                  吴星强
                  <i className="el-icon-caret-bottom el-icon--right"></i>
                </span>
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}
