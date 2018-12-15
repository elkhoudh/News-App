import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Github from "./components/Github";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <BrowserRouter>
          <>
            <Route path="/" exact component={Home} />
            <Route path="/github" component={Github} />
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
