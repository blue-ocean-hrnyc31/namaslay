import React, { useState } from "react";
import "./stylesheets/app.scss";
import LeaderBoard from "./leaderBoard/index.js";
import Events from "./buletinBoard/Events.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Signup, Login, Logout, Admin } from "./login/index.jsx";
import { AuthContext, useAuth } from "./login/auth";
import ProtectedRoute from "./login/protectedRoute";
import Home from "./Home.js";
import MeditationRiver from "./river/MeditationRiver.js";
import AsanaRiver from "./river/AsanaRiver.js";
import About from "./about";
import ScrollToTop from "./ScrollToTop.js";
import Menu from "./Menu";

const App = (props) => {
  const connectSID = document.cookie.includes("connect.sid") || false;
  const [authTokens, setAuthTokens] = useState(connectSID);
  const [user, setUser] = useState({});
  const [redirectPath, setRedirectPath] = useState("/");

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      <Router>
        <ScrollToTop />
        <div className="grid-container">
          <header></header>
          <Menu authTokens={authTokens} setAuthTokens={setAuthTokens} />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about">
                <About />
              </Route>
              <Route path="/leaderboard">
                <LeaderBoard />
              </Route>
              <Route path="/bulletinboard">
                <Events isUserLogged={authTokens} />
              </Route>
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    redirectPath={redirectPath}
                    handleUser={setUser}
                    handleLog={setAuthTokens}
                    isLoggedIn={authTokens}
                    {...props}
                  />
                )}
              />

              <Route path="/signup" render={(props) => <Signup {...props} />} />
              <ProtectedRoute
                component={MeditationRiver}
                user={user}
                handlePath={setRedirectPath}
                path="/meditation-river"
              />
              <ProtectedRoute
                component={AsanaRiver}
                user={user}
                handlePath={setRedirectPath}
                path="/asana-river"
              />
              <ProtectedRoute component={Admin} path="/admin" />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
