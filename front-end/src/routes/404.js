import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Minion404 from "../assets/images/minion-404.jpg";
import { Button } from "@material-ui/core";

const styles = (theme) => ({
  base: {
    backgroundImage: `url(${Minion404})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  returnHomeButton: {
    marginTop: "70vh",
  },
});

const NotFoundPage = (props) => {
  const { classes, history } = props;
  return (
    <div className={classes.base}>
      <Button
        variant="contained"
        className={classes.returnHomeButton}
        color="primary"
        size="large"
        onClick={() => history.push("/")}
      >
        Return to Home
      </Button>
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
