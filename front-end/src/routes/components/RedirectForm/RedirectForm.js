import React, { useState } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { CreateRedirect } from "../../../utils/api";

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

const RedirectForm = (props) => {
  const { classes, setNewRedirect } = props;
  const [userUrl, setUserUrl] = useState("");

  const handleButtonSubmit = () => {
    CreateRedirect(userUrl).then((res) => {
      setNewRedirect(window.location.href + res.data.redirect_id);
      setUserUrl("");
    });
  };

  return (
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
  );
};

export default withStyles(styles)(RedirectForm);
