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
  const [upcoming, setUpcoming] = useState(dummyData);
  useEffect(() => {
    countPracticing()
      .then((number) => {
        setCurrentlyPracticing(number[0].count);
      })
      .catch((err) => {
        console.error(err);
      });
    getUpcoming()
      .then((response) => {
        setUpcoming(response);
      })
      .catch((err) => console.error(err));
  }, []);
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
        <table className="upcoming">
          <tbody>
            {upcoming.length > 0 &&
              upcoming.map((event, i) => (
                <tr className="uRows" key={i}>
                  <td className="uDate">{event.start_time.slice(5, 10)}</td>
                  <td className="uEvent">
                    <span>{event.title}</span> hosted by {event.host}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

const dummyData = [
  {
    description: "Cool vibes drum session remote",
    end_time: "2020-09-18T14:47:10.754Z",
    host: "Patrick Swazye",
    id: 5,
    location: "zoom",
    start_time: "2020-09-18T14:47:10.754Z",
    title: "Drum Circle",
  },
];
