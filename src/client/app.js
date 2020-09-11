import React from "react";
import "./stylesheets/app.scss";
import LeaderBoard from "./leaderBoard/index.js";

const App = (props) => {
  return (
    <div className="app">
      <h1>Namaste</h1>
      <LeaderBoard />
    </div>
  );
};

export default App;
