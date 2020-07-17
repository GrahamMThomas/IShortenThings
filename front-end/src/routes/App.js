import React, { useState } from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RedirectViewer from "./components/RedirectViewer";
import RedirectForm from "./components/RedirectForm/RedirectForm";

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

  return (
    <div className="App">
      <header className="App-header">
        <Typography className={classes.title}> I Shorten Things</Typography>

        <RedirectForm setNewRedirect={setNewRedirect} />
        {newRedirect ? <RedirectViewer url={newRedirect} /> : null}
      </header>
    </div>
  );
};

export default withStyles(styles)(App);
