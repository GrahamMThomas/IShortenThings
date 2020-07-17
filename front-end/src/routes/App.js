import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  Button,
  Slider,
  Typography,
  Grid,
  Paper,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { CreateRedirect, API_ENDPOINT } from "../utils/api";
import RedirectViewer from "./components/RedirectViewer";

const styles = (theme) => ({
  title: {
    fontFamily: "avengers",
    fontSize: "4em",
    color: "#807E81",
    marginTop: theme.spacing(8),
  },
  formPaper: {
    padding: theme.spacing(2),
  },
  settingsButton: {
    backgroundColor: "#807E81",
    marginLeft: theme.spacing(4),
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    marginTop: theme.spacing(4),
    backgroundColor: "#FFF72B",
  },
});

const App = (props) => {
  const { classes } = props;
  const [newRedirect, setNewRedirect] = useState(null);
  const [userUrl, setUserUrl] = useState("");

  const handleButtonSubmit = () => {
    CreateRedirect(userUrl).then((res) => {
      setNewRedirect(window.location.href + res.data.redirect_id);
      setUserUrl("");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography className={classes.title}> I Shorten Things</Typography>

        <Paper className={classes.formPaper}>
          <div className={classes.center} style={{ marginLeft: "32px" }}>
            <TextField
              label="Url to shorten"
              onChange={(e) => setUserUrl(e.target.value)}
            />
            <Button variant="contained" className={classes.settingsButton}>
              <SettingsIcon style={{ color: "#FFF72B" }} />
            </Button>
          </div>
          <Button
            className={classes.submitButton}
            variant="contained"
            size="large"
            onClick={handleButtonSubmit}
          >
            Shorten Me!
          </Button>
        </Paper>

        {newRedirect ? <RedirectViewer url={newRedirect} /> : null}
      </header>
    </div>
  );
};

export default withStyles(styles)(App);
