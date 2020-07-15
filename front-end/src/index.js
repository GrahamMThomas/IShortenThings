import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RedirectComponent from "./Redirect";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route
            string
            path="/:redirect_id([a-zA-Z1-9]{8,})"
            component={RedirectComponent}
            // render={(props) => {
            //   const redirect_id = props.match.params.redirect_id;

            //   // Check if redirect exists, if so, send it there, otherwise, bump to App

            // }}
          ></Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
