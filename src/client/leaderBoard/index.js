import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/leaderboard.scss';

const LeaderBoard = (props) => {
  const [leaders, setLeaders] = useState(dummyData);

  useEffect(() => {
    console.log('Mounting Leaderboard');
    axios
      .get(`http://localhost:4444/leaders`)
      .then((row) => {
        console.log('Getting back data: ', row);
        // Set the new state with setLeader Function
        setLeaders(row.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          className='UserLevel'
          style={{ color: '#FF0000', background: '#000' }}
        >
          &#x950;
        </span>
      );
    } else if (hours > 12) {
      return (
        <span
          className='UserLevel'
          style={{ color: '#C0C0C0', background: '#000' }}
        >
          &#x950;
        </span>
      );
    } else {
      return (
        <span
          className='UserLevel'
          style={{ color: '#b08d57', background: '#000' }}
        >
          &#x950;
        </span>
      );
    }
  }

  return (
    <div className='leaderboard'>
      <table>
        <tbody>
          <tr>
            <th className='levelEntry'>{''}</th>
            <th className='nameEntry'>User</th>
            <th className='visitEntry'>Times Meditated</th>
            <th className='minsEntry'>Total Time</th>
          </tr>
          {leaders.map((leader, i) => (
            <tr className='tableRow' key={`row${i}`}>
              <td className='levelEntry'>{userLevel(leader.total_mins)}</td>
              <td className='nameEntry'>{`${leader.first_name} ${leader.last_name}`}</td>
              <td className='visitEntry'>{leader.visit_count}</td>
              <td className='minsEntry'>{formatTime(leader.total_mins)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;

const dummyData = [
  {
    userId: 1,
    first: 'John',
    last: 'Doe',
    totalMins: 50,
    visitCount: 3,
    level: 'bronze',
  },
  {
    userId: 2,
    first: 'Jane',
    last: 'Smith',
    totalMins: 5,
    visitCount: 1,
    level: 'bronze',
  },
  {
    userId: 3,
    first: 'Larry',
    last: 'Lambert',
    totalMins: 500,
    visitCount: 10,
    level: 'gold',
  },
  {
    userId: 4,
    first: 'Stephen',
    last: 'Mark',
    totalMins: 100,
    visitCount: 4,
    level: 'silver',
  },
  {
    userId: 5,
    first: 'Matt',
    last: 'Faris',
    totalMins: 5,
    visitCount: 2,
    level: 'bronze',
  },
];
