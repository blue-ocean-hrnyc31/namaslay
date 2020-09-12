import React from "react";
import "./stylesheets/app.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LeaderBoard from "./leaderBoard/index.js";
import Home from "./Home.js";
import Chart from './river/index.js'

const App = (props) => {
  return (
    <Router>
      <div className="grid-container">
        <header></header>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/rivers">Meditation River</Link>
          <Link to="/rivers">Asana River</Link>
          <Link to="/bulletinboard">Upcoming Events</Link>
          <Link to="/leaderboard">Leader Board</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about"></Route>
            <Route path="/leaderboard">
              <LeaderBoard></LeaderBoard>
            </Route>
            <Route path="/bulletinboard"></Route>
            <Route path="/login"></Route>
            <Route path="/rivers"><Chart/></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
