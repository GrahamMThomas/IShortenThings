import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RedirectComponent from "./Redirect";
import NotFoundPage from "./404";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/not-found" component={NotFoundPage}></Route>
          <Route
            string
            path="/:redirect_id([a-zA-Z1-9]{8,})"
            component={RedirectComponent}
          ></Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
