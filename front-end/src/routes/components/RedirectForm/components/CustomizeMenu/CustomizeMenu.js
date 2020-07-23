import React, { useState } from "react";
import {
  Paper,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import UsesSlider from "../UsesSlider/UsesSlider";

const CustomizeMenu = (props) => {
  const { setRickRoll, setUsesLeft } = props;
  const [displayRR, setDisplayRR] = useState(false);

  return (
    <Paper style={{ marginTop: "16px" }}>
      <Typography variant="overline">Custom Settings</Typography>
      <FormGroup row style={{ marginLeft: "24px", flexDirection: "column" }}>
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
        <div style={{ margin: "16px" }}>
          <UsesSlider setUsesLeft={setUsesLeft} />
        </div>
      </FormGroup>
    </Paper>
  );
};

export default CustomizeMenu;
