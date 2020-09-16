import React, { useState } from 'react';
import './stylesheets/app.scss';
import LeaderBoard from './leaderBoard/index.js';
import Events from './buletinBoard/Calendar.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Signup, Login, Logout, Admin } from './login/index.jsx';
import Chart from './river/index.js';
import { AuthContext, useAuth } from './login/auth';
import ProtectedRoute from './login/protectedRoute';
import Home from './Home.js';
import MeditationRiver from './river/MeditationRiver.js';
import AsanaRiver from './river/AsanaRiver.js';
import About from './about';
import ScrollToTop from './ScrollToTop.js';
import Menu from './Menu';

const App = (props) => {
  const connectSID = document.cookie.includes('connect.sid') || false;
  const [authTokens, setAuthTokens] = useState(connectSID);
  const [isLoggedIn, setLogged] = useState(connectSID);
  const [isSignedUp, setSignup] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      <Router>
        <ScrollToTop />
        <div className='grid-container'>
          <header></header>
          <Menu authTokens={authTokens} />
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/leaderboard'>
                <LeaderBoard />
              </Route>
              <Route path='/bulletinboard'>
                <Events />
              </Route>
              <Route
                path='/login'
                render={(props) => (
                  <Login
                    handleUser={setUser}
                    handleLog={setAuthTokens}
                    isLoggedIn={authTokens}
                    {...props}
                  />
                )}
              />

              <Route path='/signup' render={(props) => <Signup {...props} />} />

              <Route path='/meditation-river'>
                <MeditationRiver user={user} />
              </Route>

              <Route path='/asana-river'>
                <AsanaRiver user={user} />
              </Route>
              <ProtectedRoute component={Admin} path='/admin' />
              <Route path='/logout'>
                {!authTokens && <Redirect to='/' />}
                <Logout setAuthTokens={setAuthTokens} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
