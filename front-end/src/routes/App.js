import React, { useState, useEffect } from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useCookies } from "react-cookie";
import RedirectViewer from "./components/RedirectViewer/RedirectViewer";
import RedirectForm from "./components/RedirectForm/RedirectForm";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const styles = (theme) => ({
  title: {
    fontFamily: "avengers",
    fontSize: "4em",
    color: "#807E81",
    marginTop: theme.spacing(8),
  },
});

// https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const App = (props) => {
  const { classes } = props;
  const [cookies, setCookie] = useCookies(["ishortenthings"]);
  const [newRedirect, setNewRedirect] = useState(null);
  const [error, setError] = useState(null);

  // Set Cookie on First Visit
  useEffect(() => {
    if (typeof cookies.visitorId == "undefined") {
      setCookie("visitorId", uuidv4());
    }
  });

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography className={classes.title}> I Shorten Things</Typography>

        <RedirectForm setNewRedirect={setNewRedirect} setError={setError} />
        {newRedirect ? <RedirectViewer url={newRedirect} /> : null}

        <Snackbar
          open={error !== null}
          autoHideDuration={3000}
          onClose={handleErrorClose}
        >
          <Alert
            onClose={handleErrorClose}
            data-testid="errorAlert"
            severity="error"
          >
            Internal Server Error
          </Alert>
        </Snackbar>
      </header>
    </div>
  );
};

export default withStyles(styles)(App);
