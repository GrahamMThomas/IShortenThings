import React, { useState } from "react";
import { Button, Paper, TextField, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

import { CreateRedirect } from "../../../utils/api";
import CustomizeMenu from "./components/CustomizeMenu/CustomizeMenu";
import { validURL } from "./validations";

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
    backgroundColor: "#807E81",
    color: "#FFF72B",
  },
});

const RedirectForm = (props) => {
  const { classes, setNewRedirect, setError } = props;

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const [userUrl, setUserUrl] = useState("");
  const [usesLeft, setUsesLeft] = useState(10);
  const [canRickRoll, setCanRickRoll] = useState(false);

  const handleButtonSubmit = () => {
    if (!checkIfValidInput(userUrl)) {
      return;
    }
    setLoading(true);
    CreateRedirect(userUrl, usesLeft, canRickRoll)
      .then((res) => {
        // Had to hardcode because of dns issue
        setNewRedirect(
          (process.env.NODE_ENV === "production"
            ? "https://app.ishortenthings.com/"
            : window.location.href) + res.data.redirect_id
        );
        setUserUrl("");
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const checkIfValidInput = (value) => {
    if (!validURL(value)) {
      setValidationError("Must be a valid URL. ex. https://intuit.com");
      return false;
    }
    return true;
  };

  const handleInputUpdate = (value) => {
    setValidationError(null);
    setUserUrl(value);
  };

  return (
    // TODO Potentially split into multiple components
    <Paper className={classes.formPaper}>
      {/* Form Input */}
      <div className={classes.center} style={{ marginLeft: "24px" }}>
        <TextField
          error={validationError !== null}
          label="Url to shorten"
          onChange={(e) => handleInputUpdate(e.target.value)}
          disabled={loading}
          helperText={validationError || "ex. https://intuit.com"}
          style={{ minWidth: "300px" }}
          value={userUrl}
          inputProps={{ "data-testid": "urlTextField" }}
        />
        <Button
          variant="contained"
          className={classes.settingsButton}
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <SettingsIcon style={{ color: "#FFF72B" }} />
        </Button>
      </div>

      {/* Customize Button */}
      {settingsOpen ? (
        <CustomizeMenu setRickRoll={setCanRickRoll} setUsesLeft={setUsesLeft} />
      ) : null}

      {/* Submit Button */}
      <div
        className={classes.center}
        style={{ marginTop: "32px", marginLeft: "64px" }}
      >
        <Button
          className={classes.submitButton}
          variant="contained"
          size="large"
          onClick={handleButtonSubmit}
          disabled={loading}
          data-testid="submitButton"
        >
          Shorten Me!
        </Button>

        <CircularProgress
          style={{ marginLeft: "24px", opacity: loading ? "100" : "0" }}
        />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(RedirectForm);
