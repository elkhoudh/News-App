import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    searchTerm: '',
    isSubmitted: '',
    data: []
  }

  componentDidMount(){
    fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=8ae4612a456a4220952d4dbd49878716`)
      .then(res => res.json())
      .then(data => this.setState({data}))    
  }

  handleChange = e => {
    this.setState({searchTerm: e.target.value})
  }
  
  fetchData = () => {
    fetch(`https://newsapi.org/v2/everything?q=${this.state.searchTerm}&apiKey=8ae4612a456a4220952d4dbd49878716`)
      .then(res => res.json())
      .then(data => this.setState({data}))
  }
  render() {
    return (
      <div>
        <h1>The news site</h1>
        <label htmlFor="searchTerm">Search</label>
        <input onChange={this.handleChange} value={this.state.searchTerm} name="searchTerm" id="searchTerm" type="text" placeholder="Search Here..." />
        <button type="submit" onClick={this.fetchData}>Submit</button>
        {console.log(this.state.data.articles)}
      </div>
    );
  }
}

export default App;
