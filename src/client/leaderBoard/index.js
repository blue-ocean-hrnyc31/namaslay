import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/leaderboard.scss';

const LeaderBoard = (props) => {
  const [leaders, setLeaders] = useState(dummyData);

  useEffect(() => {
    console.log('Mounting Leaderboard');
    axios
      .get(`http://34.229.137.235:4444/users`)
      .then((row) => {
        console.log('Getting back data: ', row.data.fields);
        // Set the new state with setLeader Function
      })
      .catch((err) => {
        console.log(err);
      });
  }, [leaders]);

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) {
      return `${mins} minutes`;
    }
    return `${hours} hours ${mins} minutes`;
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
              <td className='levelEntry'>{leader.level}</td>
              <td className='nameEntry'>{`${leader.first} ${leader.last}`}</td>
              <td className='visitEntry'>{leader.visitCount}</td>
              <td className='minsEntry'>{formatTime(leader.totalMins)}</td>
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
