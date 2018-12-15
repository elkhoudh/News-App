import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Github extends Component {
  state = {
    title: "JS",
    location: "Los Angles, California",
    data: []
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getData = () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl = `https://jobs.github.com/positions.json?description=${
        this.state.title
      }&location=${this.state.location}`;
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={1}>
              <TextField
                required
                id="standard-required"
                label="Job Title"
                defaultValue={this.state.title}
                className={classes.textField}
                margin="normal"
                name="title"
                onChange={this.handleChange}
              />
              <TextField
                required
                id="standard-required"
                label="Location"
                defaultValue={this.state.location}
                className={classes.textField}
                margin="normal"
                name="location"
                onChange={this.handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.getData}
              >
                Search
              </Button>
            </Paper>
          </Grid>
          {this.state.data.length === 0 ? (
            <Paper className={classes.paper} elevation={1}>
              Please Search..
            </Paper>
          ) : (
            this.state.data.map(job => (
              <Grid key={job.id} item xs={12} sm={6} md={3}>
                <Card
                  key={job.id}
                  author={job.title}
                  publishedAt={job.location}
                  title={job.title}
                  description={job.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  content={job.how_to_apply.replace(/<\/?[^>]+(>|$)/g, "")}
                  url={job.url}
                />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  }
}

Github.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Github);
