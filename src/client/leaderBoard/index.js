import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/leaderboard.scss";

const LeaderBoard = (props) => {
  const [leaders, setLeaders] = useState(dummyData);

  useEffect(() => {
    getLeaderBoardInfo();
    setInterval(() => {
      getLeaderBoardInfo();
    }, 60000);
  }, []);
  function getLeaderBoardInfo() {
    console.log("Updating Leaderboard");
    axios
      .get(`http://34.229.137.235:4444/leaders`)
      .then((row) => {
        //console.log('Getting back data: ', row);
        // Set the new state with setLeader Function
        setLeaders(row.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) {
      return `${mins} minutes`;
    }
    return `${hours} hours ${mins} minutes`;
  }

  function userLevel(minutes) {
    const hours = Math.floor(minutes / 60);
    if (hours > 24) {
      return (
        <span
          className="UserLevel"
          style={{ color: "#FFD700", background: "#000", fontSize: "25px" }}
        >
          &#x950;
        </span>
      );
    } else if (hours > 12 && hours < 24) {
      return (
        <span
          className="UserLevel"
          style={{ color: "#C0C0C0", background: "#000", fontSize: "25px" }}
        >
          &#x950;
        </span>
      );
    } else {
      return (
        <span
          className="UserLevel"
          style={{ color: "#b08d57", background: "#000", fontSize: "25px" }}
        >
          &#x950;
        </span>
      );
    }
  }

  return (
    <div>
        <table>
          <tbody>
          <tr className="topRow">
              <th className="levelEntry">Level</th>
              <th className="nameEntry">User</th>
              <th className="visitEntry">Times Meditated</th>
              <th className="minsEntry">Total Time</th>
            </tr>
          </tbody>
        </table>
      <div className="leaderboard">
        <table>
          <tbody>
            {/* <tr className="topRow">
              <th className="levelEntry">Level</th>
              <th className="nameEntry">User</th>
              <th className="visitEntry">Times Meditated</th>
              <th className="minsEntry">Total Time</th>
            </tr> */}
            {leaders.map((leader, i) => (
              <tr className="tableRow" key={`row${i}`}>
                <td className="levelEntry">{userLevel(leader.total_mins)}</td>
                <td className="nameEntry">{`${leader.first_name} ${leader.last_name}`}</td>
                <td className="visitEntry">{leader.visit_count}</td>
                <td className="minsEntry">{formatTime(leader.total_mins)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="note">*Updates every minute</p>
    </div>
  );
};

export default LeaderBoard;

const dummyData = [
  {
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    total_mins: 50000,
    visit_count: 3,
    level: "bronze",
  },
  {
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    total_mins: 5,
    visit_count: 1,
    level: "bronze",
  },
  {
    userId: 3,
    first_name: "Larry",
    last_name: "Lambert",
    total_mins: 500,
    visit_count: 10,
    level: "gold",
  },
  {
    userId: 4,
    first_name: "Stephen",
    last_name: "Mark",
    total_mins: 100,
    visit_count: 4,
    level: "silver",
  },
  {
    userId: 5,
    first_name: "Matt",
    last_name: "Faris",
    total_mins: 5,
    visit_count: 2,
    level: "bronze",
  },
  {
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    total_mins: 50,
    visit_count: 3,
    level: "bronze",
  },
  {
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    total_mins: 780,
    visit_count: 1,
    level: "bronze",
  },
  {
    userId: 3,
    first_name: "Larry",
    last_name: "Lambert",
    total_mins: 500,
    visit_count: 10,
    level: "gold",
  },
  {
    userId: 4,
    first_name: "Stephen",
    last_name: "Mark",
    total_mins: 100,
    visit_count: 4,
    level: "silver",
  },
  {
    userId: 5,
    first_name: "Matt",
    last_name: "Faris",
    total_mins: 5,
    visit_count: 2,
    level: "bronze",
  },
  {
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    total_mins: 50,
    visit_count: 3,
    level: "bronze",
  },
  {
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    total_mins: 5,
    visit_count: 1,
    level: "bronze",
  },
  {
    userId: 3,
    first_name: "Larry",
    last_name: "Lambert",
    total_mins: 500,
    visit_count: 10,
    level: "gold",
  },
  {
    userId: 4,
    first_name: "Stephen",
    last_name: "Mark",
    total_mins: 100,
    visit_count: 4,
    level: "silver",
  },
  {
    userId: 5,
    first_name: "Matt",
    last_name: "Faris",
    total_mins: 5,
    visit_count: 2,
    level: "bronze",
  },
  {
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    total_mins: 50,
    visit_count: 3,
    level: "bronze",
  },
  {
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    total_mins: 5,
    visit_count: 1,
    level: "bronze",
  },
  {
    userId: 3,
    first_name: "Larry",
    last_name: "Lambert",
    total_mins: 500,
    visit_count: 10,
    level: "gold",
  },
  {
    userId: 4,
    first_name: "Stephen",
    last_name: "Mark",
    total_mins: 100,
    visit_count: 4,
    level: "silver",
  },
  {
    userId: 5,
    first_name: "Matt",
    last_name: "Faris",
    total_mins: 5,
    visit_count: 2,
    level: "bronze",
  },
  {
    userId: 1,
    first_name: "John",
    last_name: "Doe",
    total_mins: 50,
    visit_count: 3,
    level: "bronze",
  },
  {
    userId: 2,
    first_name: "Jane",
    last_name: "Smith",
    total_mins: 5,
    visit_count: 1,
    level: "bronze",
  },
  {
    userId: 3,
    first_name: "Larry",
    last_name: "Lambert",
    total_mins: 500,
    visit_count: 10,
    level: "gold",
  },
  {
    userId: 4,
    first_name: "Stephen",
    last_name: "Mark",
    total_mins: 100,
    visit_count: 4,
    level: "silver",
  },
  {
    userId: 5,
    first_name: "Matt",
    last_name: "Faris",
    total_mins: 5,
    visit_count: 2,
    level: "bronze",
  },
];
