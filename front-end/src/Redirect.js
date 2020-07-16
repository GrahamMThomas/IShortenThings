import React, { useState, useEffect } from "react";
import { UseRedirect } from "./api";
import NotFoundPage from "./404";
import { Redirect } from "react-router-dom";

const RedirectComponent = (props) => {
  const [result, setResult] = useState("Loading....");

  useEffect(() => {
    UseRedirect(props.match.params.redirect_id)
      .then((res) => {
        console.log(res.data);
        if (res.data.redirect) {
          window.location.href = res.data.redirect.url;
        } else {
          props.history.push("/");
        }
      })
      .catch(() => props.history.push("/not-found"));
  });

  return result;
};

export default RedirectComponent;
