import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Card from './components/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  state = {
    searchTerm: '',
    results: 20,
    data: []
  }

  componentDidMount(){
    fetch(`https://newsapi.org/v2/everything?q=software&apiKey=8ae4612a456a4220952d4dbd49878716`)
      .then(res => res.json())
      .then(data => this.setState({data}))    
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  fetchData = (e) => {
    e.preventDefault();
    if(this.state.searchTerm.length === 0){
      alert('Please Enter Search Term')
    } else {
      fetch(`https://newsapi.org/v2/everything?q=${this.state.searchTerm}&pageSize=${this.state.results}&apiKey=8ae4612a456a4220952d4dbd49878716`)
      .then(res => res.json())
      .then(data => this.setState({data}))
    }
    
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="app">
        <NavBar />   
        <div className={classes.root}>
        <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <form onSubmit={this.fetchData}>
          <input onChange={this.handleChange}  value={this.state.searchTerm} name="searchTerm" id="searchTerm" type="text" placeholder="Search Here..." required/>
          
          <InputLabel htmlFor="results">Results</InputLabel>
          <Select
            value={this.state.results}
            onChange={this.handleChange}
            inputProps={{
              name: 'results',
              id: 'results',
            }}
          >
          <MenuItem value={20}>
              <em>20</em>
            </MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <button type="submit" onClick={this.fetchData}>Submit</button>
          </form>
          </Paper>
        </Grid>
      {this.state.data.length === 0 ? '' : this.state.data.articles.map(article => 
        <Grid key={article.url} item xs={12} sm={6} md={3}>
          <Card 
            key={article.url} 
            author={article.author} 
            publishedAt={article.publishedAt} 
            urlToImage={article.urlToImage} 
            title={article.title} 
            description={article.description} 
            content={article.content} 
            url={article.url}
          />
        </Grid>          
          )}
      </Grid>
    </div>

</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(App);
