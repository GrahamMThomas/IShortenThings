import React, { useState } from "react";
import {
  Checkbox,
  Paper,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import UsesSlider from "../UsesSlider/UsesSlider";
import { validPassword } from "./validations";

const CustomizeMenu = (props) => {
  const { setRickRoll, setUsesLeft, setPassword } = props;
  const [displayRR, setDisplayRR] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(null);

  const handlePasswordChange = (value) => {
    if (validPassword(value)) {
      setPasswordValidation(null);
    } else {
      setPasswordValidation("Invalid password.");
    }
    setPassword(value);
  };

  return (
    <Paper>
      <Typography variant="overline">Custom Settings</Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: "12px" }}
      >
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                inputProps={{ "data-testid": "rickRollSwitch" }}
                checked={displayRR}
                onChange={(e) => {
                  setDisplayRR(e.target.checked);
                  setRickRoll(e.target.checked);
                }}
                name="canRickRollSwitch"
                color="primary"
              />
            }
            label="RickRoll (~15% chance)"
          />
        </Grid>
        <Grid item>
          <Checkbox
            checked={usePassword}
            data-testid="passwordCheckBox"
            onChange={(e) => setUsePassword(e.target.checked)}
          />
          <TextField
            inputProps={{ "data-testid": "passwordTextField" }}
            disabled={!usePassword}
            label="Password"
            error={passwordValidation}
            helperText={passwordValidation || "Letters and Numbers only"}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Grid>
        <Grid item style={{ display: "flex" }}>
          <UsesSlider setUsesLeft={setUsesLeft} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomizeMenu;
