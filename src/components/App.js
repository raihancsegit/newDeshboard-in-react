import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import Post from "../pages/post/post.js";
import Details from "../pages/details/details.js"
import Registration from "../pages/registration/registration.js"
import Download from "../pages/download/download.js"
import Forget from "../pages/forget/forget.js"
// context
import { useUserState } from "../context/UserContext";

var Parse = require('parse/node');
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize("B5WFknWNWuT43qeXEpW2VFDcHRpf3FgZKxZKVnoq", "PcPbvBzFqChGBT3FTcgTrGdjJGNm8ewSXGquYd2U","4Z3xBNXbEfUbWOWs1qeKHECoZygC74fe6RsOAHp2");

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        
        <PublicRoute path="/login" component={Login} />


        <Route path="/posts" component={Post} />
        <Route exact path="/post-details/:post_id" component={Details} />
        <Route exact path="/invite/:who" component={Registration} />
        <Route exact path="/download" component={Download} />
        
        <Route exact path="/forget-password" component={Forget} />

        
       
        <Route component={Error} />
      </Switch>
    </HashRouter>

      
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  function NotLoginRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            React.createElement(component, props)
        }
      />
    );
  }

}
