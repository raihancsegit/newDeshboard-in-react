import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

import Feeds from "../../pages/feeds/feeds.js";
//import Feedsf from "../../pages/feedsf/feedsf.js";
import Users from "../../pages/users/users.js";
import Comments from "../../pages/comments/comments.js";
import Active from "../../pages/active/active.js";
import Publish from "../../pages/publish/publish.js";
import Unpublish from "../../pages/unpublish/unpublish.js";
import Terms from "../../pages/terms/terms.js";
import About from "../../pages/about/about.js";
import Settings from "../../pages/settings/settings.js";
import Repoted from "../../pages/repoted/repoted.js";
import Profile from "../../pages/profile/profile.js";
// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
         <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/users" component={Users} />
              <Route path="/app/feeds" component={Feeds} />
              <Route path="/app/comments" component={Comments} />

               <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/repoted" component={Repoted} />
              <Route path="/app/active" component={Active} />
              <Route path="/app/publish" component={Publish} />
              <Route path="/app/unpublish" component={Unpublish} />
              <Route path="/app/about" component={About} />
              <Route path="/app/terms" component={Terms} />
              <Route path="/app/settings" component={Settings} />
              <Route path="/app/profile" component={Profile} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
