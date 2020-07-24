import React, { useEffect } from "react";
import { UseRedirect } from "../utils/api";
import { useCookies } from "react-cookie";
import { Container, CircularProgress } from "@material-ui/core";

const RedirectComponent = (props) => {
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
      .catch((e) => {
        if (e.response.status === 401) {
          props.history.push(
            `enter-password/${props.match.params.redirect_id}`
          );
        } else {
          props.history.push("/not-found");
        }
      });
  });

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default RedirectComponent;
