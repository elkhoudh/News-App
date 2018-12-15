import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Github extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <TextField
            required
            id="standard-required"
            label="Job Title"
            defaultValue="JS"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            required
            id="standard-required"
            label="Location"
            defaultValue="Los Angles, California"
            className={classes.textField}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Search
          </Button>
        </Paper>
        <Paper className={classes.root} elevation={1}>
          <h1>Results</h1>
        </Paper>
      </div>
    );
  }
}

Github.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Github);
