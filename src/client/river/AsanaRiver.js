import React, { useState, useEffect } from "react";
import Chart from "./index";
import "../stylesheets/river.scss";
import axios from "axios";
import moment from "moment";

const AsanaRiver = () => {
  const [inputValue, setInputValue] = useState("");
  const [postStream, setPostStream] = useState(mockStreamData);
  const [inRiver, setInRiver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [allUsersInAsana, setAllUsersInAsana] = useState([]);
  const [activityValue, setActivityValue] = useState("");

  useEffect(() => {
    fetchUsersInAsana();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  //fetch user posts in the stream
  const fetchStream = () => {
    return axios.get("/asana-river/stream");
    console
      .log(data)
      .then(({ data }) => {
        setPostStream(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //post current user's practice to the stream
  //need to get current user as prop
  const handleInputSubmit = (e) => {
    e.preventDefault();
    return axios
      .post("/asana-river/post", {
        currentUser: "",
        meditationPost: inputValue,
        submitTime: moment(),
      })
      .then(() => {
        setInputValue("");
        fetchStream();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //fetch all users in Asana River
  const fetchUsersInAsana = () => {
    return axios
      .get("/user/asana")
      .then(({ data }) => {
        setAllUsersInAsana(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //when user enters, set the inAsana property to true and update the  activity in the user table in the database
  const handleUserEnter = () => {
    return axios
      .patch("/user/enter-asana", {
        current_river: "asana",
        activity: activityValue,
      })
      .then(() => {
        console.log("Successfully updated.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //when user exits, update the practiced time and reset the inAsana property to false in the user table in the database
  const handleUserExit = (practicedTime) => {
    return axios
      .patch("/user/exit-asana", {
        total_mins: total_mins + practicedTime,
        current_river: null,
      })
      .then(() => {
        console.log("Successfully updated.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //when start/end practice button is clicked, start/stop the timer, reset inRiver status for button rendering logic, handles user exit/enter, and refreshes the users in the river.
  const handleClickPractice = () => {
    if (inRiver) {
      let practicedTime = Math.round((Date.now() - startTime) / 60000);
      setInRiver(false);
      handleUserExit(practicedTime);
      fetchUsersInAsana();
    } else {
      setInRiver(true);
      setStartTime(Date.now());
      handleUserEnter();
      fetchUsersInAsana();
    }
  };

  return (
    <div className="practice-room-container">
      <div className="chart-conatainer">
        <Chart allUsersInAsana={allUsersInAsana} />
        <br />
        <div className="center">
          <input
            className="activity-input"
            type="text"
            placeholder="What are you practicing today?"
            value={activityValue}
            onChange={(e) => setActivityValue(e.target.value)}
          ></input>
        </div>
        <br />
        <div className="center">
          {
            <button className="practice-timer" onClick={handleClickPractice}>
              {" "}
              {!inRiver ? "Start your practice" : "End your practice"}
            </button>
          }
        </div>
      </div>
      <div className="practice-board-container">
        <div className="practice-board">
          <iframe
            src="https://open.spotify.com/embed/playlist/3SwVxW3qgPEytBEV4DQ8i8"
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
          <h2>Tell us about today's practice</h2>
          <input
            className="practice-stream-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <input type="submit" onSubmit={handleInputSubmit}></input>
          <br />
          <br />
          <div>
            {postStream.length ? (
              postStream.map((post) => {
                return (
                  <div className="practice-stream">
                    {post.user}: {post.post}{" "}
                    <span style={{ fontSize: "0.2em" }}>{post.postedAt}</span>
                    <br />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsanaRiver;

const mockStreamData = [
  { user: "nuri", post: "Practicing vinyasa", postedAt: "few seconds ago" },
  { user: "liam", post: "Practicing hatha", postedAt: "2 minutes ago" },
  { user: "jeremy", post: "Practicing bikram", postedAt: "5 minutes ago" },
];
