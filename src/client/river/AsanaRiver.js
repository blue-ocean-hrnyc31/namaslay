import React, { useState, useEffect } from 'react';
import Chart from './index';
import '../stylesheets/river.scss';
import axios from 'axios';
import moment from 'moment';
const host = 'localhost:4444';

const AsanaRiver = ({ user }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatStream, setChatStream] = useState([]);
  const [inRiver, setInRiver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [allUsersInAsana, setAllUsersInAsana] = useState(dummyUsers);
  const [activityValue, setActivityValue] = useState('');

  // useEffect(() => {
  //   fetchUsersInAsana();
  // }, []);

  /********************************************/
  /********** Fetch the Chat Stream! **********/
  /********************************************/
  const fetchChatStream = () => {
    axios({
      method: 'get',
      url: `https://${host}/asana-river/chat`,
    })
      .then(({ data }) => {
        console.log('Chat stream data:', data);
        setChatStream(data);
      })
      .catch((err) => {
        console.log('Error in getting chat data:', err);
        setChatStream(mockStreamData);
      });
  };

  /********************************************/
  /******** Post Chat to Chat Stream! *********/
  /********************************************/
  const handleSendChat = () => {
    // Might need to pass chat in for when user enters River
    // need to get current user as prop
    axios({
      method: 'post',
      url: `https://${host}/asana-river/chat`,
      data: {
        currentUser: 'Bob', // From props hopefully
        message: chatInput,
        submitTime: moment(),
      },
    })
      .then((res) => {
        setChatInput('');
        fetchChatStream();
      })
      .catch((err) => {
        fetchChatStream();
        console.log(err);
      });
  };

  /********************************************/
  /****** Fetch all Users in the River! *******/
  /********************************************/

  const fetchUsersInAsana = () => {
    return axios
      .get(`https://${host}/asana-river/users`)
      .then(({ data }) => {
        setAllUsersInAsana(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /********************************************/
  /***** Handler for River In/Out Button ******/
  /********************************************/

  //when user enters, set the inAsana property to true and update the  activity in the user table in the database
  const handleUserEnter = () => {
    return axios
      .patch(`https://${host}/asana-river/user-enter/${user.user_id}`, {
        current_river: 'asana',
        activity: activityValue,
      })
      .then(() => {
        console.log('Successfully updated.');
        setActivityValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //when user exits, update the practiced time and reset the inAsana property to false in the user table in the database
  const handleUserExit = (practicedTime) => {
    return axios
      .patch(`https://${host}/asana-river/user-enter/${user.user_id}`, {
        total_mins: practicedTime,
        current_river: null,
      })
      .then(() => {
        console.log('Successfully updated.');
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
    <div className='practice-room-container'>
      <div className='chart-conatainer'>
        <Chart allUsersInAsana={allUsersInAsana} />
        <br />
        <div className='center'>
          <input
            className='activity-input'
            type='text'
            placeholder='What are you practicing today?'
            value={activityValue}
            onChange={(e) => setActivityValue(e.target.value)}
          ></input>
        </div>
        <br />
        <div className='center'>
          {
            <button className='practice-timer' onClick={handleClickPractice}>
              {' '}
              {!inRiver ? 'Start your practice' : 'End your practice'}
            </button>
          }
        </div>
      </div>
      <div className='practice-board-container'>
        <div className='practice-board'>
          <iframe
            src='https://open.spotify.com/embed/playlist/3SwVxW3qgPEytBEV4DQ8i8'
            width='300'
            height='80'
            frameBorder='0'
            allowtransparency='true'
            allow='encrypted-media'
          ></iframe>
          <h2>Tell us about today's practice</h2>
          <input
            className='practice-stream-input'
            type='text'
            value={chatInput}
            placeholder='Keep messages under 50 characters please'
            onChange={(e) => {
              setChatInput(e.target.value);
            }}
          ></input>
          <button onClick={handleSendChat}>Submit</button>
          <br />
          <br />
          <div>
            {chatStream.length ? (
              chatStream.map((post) => {
                return (
                  <div className='practice-stream'>
                    {post.user}: {post.content}{' '}
                    <span style={{ fontSize: '0.2em' }}>{post.postedAt}</span>
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
  { user: 'nuri', content: 'Practicing vinyasa', postedAt: 'few seconds ago' },
  { user: 'liam', content: 'Practicing hatha', postedAt: '2 minutes ago' },
  { user: 'jeremy', content: 'Practicing bikram', postedAt: '5 minutes ago' },
];

const dummyUsers = [
  {
    username: 'Liam',
    location: 'NYC',
    current_activity: 'Chilllllllllin',
  },
  {
    username: 'Bobbito',
    location: 'Cali',
    current_activity: 'Shredding gnar',
  },
  {
    username: 'Nuri',
    location: 'NYC',
    current_activity: 'Just vibingggg',
  },
  {
    username: 'Trent',
    location: 'NYC',
    current_activity: 'Beep booping',
  },
];
