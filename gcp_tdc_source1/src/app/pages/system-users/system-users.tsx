import * as React from "react";
import { Layout } from "antd";
import "./system-users.less";
const { Sider, Content } = Layout;

interface SystemUsersProps {
  compiler: string;
  framework: string;
}

export default class SystemUsersPage extends React.Component<SystemUsersProps, {}> {
  render() {
    return (
      <Layout className="full-page">
        <Sider  width={240}
              style={{ display: 'flex', flexDirection: 'column' }}>
                1
        </Sider>
        <Content>
          1
        </Content>
      </Layout>
    );
  }
}
