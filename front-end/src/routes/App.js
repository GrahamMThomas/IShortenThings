import React, { useState } from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RedirectViewer from "./components/RedirectViewer";
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

const App = (props) => {
  const { classes } = props;
  const [newRedirect, setNewRedirect] = useState(null);
  const [error, setError] = useState(null);

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
