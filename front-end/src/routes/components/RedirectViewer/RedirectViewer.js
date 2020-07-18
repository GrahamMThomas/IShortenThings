import React, { useState } from "react";
import { Paper, Typography, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
  const [initiateCopy, setInitiateCopy] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }

    setInitiateCopy(true);
  };

  const handleClose = () => {
    setInitiateCopy(false);
  };

  return (
    <Paper className={`${classes.redirectBox} ${classes.center}`}>
      <Typography data-testid="linkTypography" className={classes.redirectText}>
        {url || ""}
      </Typography>
      <IconButton
        data-testid="copyIconButton"
        onClick={copyToClipboard}
        style={{ marginLeft: "16px" }}
      >
        <AssignmentIcon />
      </IconButton>

      <Snackbar
        open={initiateCopy}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          data-testid="copyInfoAlert"
          severity="success"
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default withStyles(styles)(RedirectViewer);
