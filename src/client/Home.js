import React, { useState, useEffect } from "react";
import "./stylesheets/home.scss";
import meditationCircle from "./images/meditation-circle.png";
import asanaCircle from "./images/asana-circle.png";
import eventsCircle from "./images/events-circle.png";
import { GoCalendar } from "react-icons/go";
import { Link } from "react-router-dom";
import { countPracticing, getUpcoming } from "./apiHelpers";

const Home = (props) => {
  const [currentlyPracticing, setCurrentlyPracticing] = useState("");
  const [upcoming, setUpcoming] = useState({});
  useEffect(() => {
    countPracticing()
    .then((number) => {
      // console.log(number[0].count);
      setCurrentlyPracticing(number[0].count);
    })
    .catch((err) => {
      console.error(err);
    })
    getUpcoming()
    .then((response) => {
      console.log("upcoming events response info : ", response);
      // setUpcoming(response);
    })
    .catch(err => console.error(err));
  })
  return (
    <div className="home">
      <div className="A">
        There are {currentlyPracticing} people practicing right now. <br />
        Take a moment to slow down and join them.
      </div>
      <div className="B">
        <img src={meditationCircle} alt="woman meditating" width="300px"></img>
      </div>
      <div className="C">
        <img src={asanaCircle} alt="woman practicing yoga" width="300px"></img>
      </div>
      <div className="D">
        THIS IS WHERE INFO ABOUT MEDITATION WILL GO. THIS IS WHERE INFO ABOUT
        MEDITATION WILL GO. THIS IS WHERE INFO ABOUT MEDITATION WILL GO. THIS IS
        WHERE INFO ABOUT MEDITATION WILL GO.
      </div>
      <div className="E">
        THIS IS WHERE INFO ABOUT ASANA WILL GO. THIS IS WHERE INFO ABOUT ASANA
        WILL GO. THIS IS WHERE INFO ABOUT ASANA WILL GO. THIS IS WHERE INFO
        ABOUT ASANA WILL GO. THIS IS WHERE INFO ABOUT ASANA WILL GO.
      </div>
      <Link to="/meditation-river">
        <div className="F">Step into the Meditation River</div>
      </Link>
      <Link to="/asana-river">
        <div className="G">Step into the Asana River</div>
      </Link>
      <div className="H">
        <img src={eventsCircle} alt="clouds and mountains" width="300px"></img>
      </div>
      <div className="I">
        <h4>
          <GoCalendar /> Upcoming Events
        </h4>
        <ul>
          <li>event1</li>
          <li>event2</li>
          <li>event3</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
