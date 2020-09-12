import React from 'react';
import './stylesheets/app.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LeaderBoard from './leaderBoard/index.js';
import {Signup, Login} from './login/index.jsx';

const App = (props) => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/leaderboard'>LeaderBoard</Link>
          </li>
          <li>
            <Link to='/bulletinboard'>Bulletinboard</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/rivers'>Rivers</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/about'></Route>
          <Route path='/leaderboard'>
            <LeaderBoard></LeaderBoard>
          </Route>
          <Route path='/bulletinboard'></Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          <Route path='/rivers'></Route>
        </Switch>
      </div>
    </Router>

  );
};

export default App;
