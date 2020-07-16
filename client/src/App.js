import React from 'react';
import Navigation from "./Components/Navigation"
import { BrowserRouter, Switch } from 'react-router-dom';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Jumbotron from './Components/Jumbotron';
import Gallery from './Components/Gallery'
import Account from "./Components/Account.js"
import Main from "./Components/Main"
import Footer from "./Components/Footer"
import About from "./Components/About"

function App() {
  return (
    <div>
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
