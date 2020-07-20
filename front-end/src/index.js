import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import NotFoundPage from "./routes/404";
import App from "./routes/App";
import RedirectComponent from "./routes/Redirect";

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
            path="/:redirect_id([a-zA-Z0-9]{8,})"
            component={RedirectComponent}
          ></Route>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
