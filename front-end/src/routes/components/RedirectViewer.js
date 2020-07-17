import React from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";

const styles = (theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  redirectBox: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    marginTop: theme.spacing(2),
  },
  redirectText: {
    fontFamily: "courier",
    color: "#807E81",
  },
});

const RedirectViewer = (props) => {
  const { classes, url } = props;
  return (
    <Paper className={`${classes.redirectBox} ${classes.center}`}>
      <Typography className={classes.redirectText}>{url || ""}</Typography>
      <IconButton
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        style={{ marginLeft: "16px" }}
      >
        <AssignmentIcon />
      </IconButton>
    </Paper>
  );
};

export default withStyles(styles)(RedirectViewer);
