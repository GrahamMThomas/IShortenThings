import React, { useState } from "react";
import {
  Paper,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

const CustomizeMenu = (props) => {
  const { setRickRoll } = props;
  const [displayRR, setDisplayRR] = useState(false);

  return (
    <Paper style={{ marginTop: "16px" }}>
      <Typography variant="overline">Custom Settings</Typography>
      <FormGroup row style={{ marginLeft: "24px" }}>
        <FormControlLabel
          control={
            <Switch
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
      </FormGroup>
    </Paper>
  );
};

export default CustomizeMenu;
