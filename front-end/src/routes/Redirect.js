import React, { useState, useEffect } from "react";
import { UseRedirect } from "../utils/api";
import { useCookies } from "react-cookie";

const RedirectComponent = (props) => {
  const [result, setResult] = useState("Loading....");
  const [cookies] = useCookies(["ishortenthings"]);

  useEffect(() => {
    UseRedirect(props.match.params.redirect_id, cookies.visitorId)
      .then((res) => {
        if (res.data.redirect && res.data.rickrolled) {
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        } else if (res.data.redirect) {
          window.location.href = res.data.redirect.url;
        } else {
          props.history.push("/not-found");
        }
      })
      .catch(() => props.history.push("/not-found"));
  });

  return result;
};

export default RedirectComponent;
