import { Redirect, browserHistory } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import React from "react";
import LayoutPage from "./pages/layout/layout";
import SystemUsers from "./pages/system-users/system-users";
import TestPage from "./pages/test/test";
import GcpAssociationListPage from "./pages/demo/demo";
import HomePage from "./pages/home/home";
// import * as PageLazyLoading from "./routes";
import SystemLockComPage from "../common/pages/system-lock/system-lock";

export default class RouterMap extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path="/">
            <Route>
              <Route path="/lock" component={SystemLockComPage} />
            </Route>
            <LayoutPage exact path="/" component={LayoutPage}>
              <Route path="" component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/test" component={TestPage} />
            </LayoutPage>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
