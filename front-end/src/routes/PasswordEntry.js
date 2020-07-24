import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { UseRedirectWPassword } from "../utils/api";
import { useCookies } from "react-cookie";

const PasswordEntry = (props) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);

  const [cookies] = useCookies(["ishortenthings"]);

  const handleSubmit = () => {
    setLoading(true);
    setTriesLeft(triesLeft - 1);
    UseRedirectWPassword(
      props.match.params.redirect_id,
      cookies.visitorId,
      password
    )
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
        if (triesLeft === 1) {
          props.history.push("/not-found");
        } else {
          setBadPassword(true);
        }
      })
      .finally(() => setLoading(false));
  };

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
      <TextField
        label="Password for redirect"
        variant="outlined"
        value={password}
        onChange={(e) => {
          setBadPassword(false);
          setPassword(e.target.value);
        }}
        error={badPassword}
        helperText={
          badPassword
            ? `Password Incorrect. ${triesLeft} tries left.`
            : "Letters and numbers only"
        }
      />
      <Button
        disabled={password.length <= 0}
        variant="contained"
        color="primary"
        style={{ marginLeft: "24px" }}
        size="large"
        onClick={handleSubmit}
      >
        Go
      </Button>
      <CircularProgress
        style={{ marginLeft: "24px", opacity: loading ? "100" : "0" }}
      />
    </Container>
  );
};

export default PasswordEntry;
