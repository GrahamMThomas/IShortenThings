import React, { useState } from 'react';
import './App.css';
import { TextField, Button, Slider, Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  title: {
    fontFamily: 'avengers',
    fontSize: '4em'
  }
})

const App = (props) => {
  const { classes } = props;
  const [newRedirect, setNewRedirect] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <Typography className={classes.title}> I Shorten Things</Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained" color="primary">Shorten Me!</Button>
        <Typography>{newRedirect || ""}</Typography>
      </header>
    </div >
  );
}

export default withStyles(styles)(App);
