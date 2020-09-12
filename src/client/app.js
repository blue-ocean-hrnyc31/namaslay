import React from 'react';
import './stylesheets/app.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LeaderBoard from './leaderBoard/index.js';
import { Signup, Login } from './login/index.jsx';
import Home from './Home.js';

const App = (props) => {
  return (
    <Router>
      <div>
        <div className='menu'>
          <Link to='/'>Home</Link>
          <Link to='/rivers'>Meditation River</Link>
          <Link to='/rivers'>Asana River</Link>
          <Link to='/bulletinboard'>Upcoming Events</Link>
          <Link to='/leaderboard'>Leader Board</Link>
          <Link to='/about'>About</Link>
          <Link to='/login'>Log in</Link>
        </div>
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about'></Route>
            <Route path='/leaderboard'>
              <LeaderBoard></LeaderBoard>
            </Route>
            <Route path='/bulletinboard'></Route>
            <Route path='/login'>
              <Signup />
            </Route>
            <Route path='/rivers'></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

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
</ul>;
