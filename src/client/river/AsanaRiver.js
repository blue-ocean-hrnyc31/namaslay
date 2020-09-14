import React, { useState, useEffect } from "react";
import Chart from "./index";
import "../stylesheets/river.scss";
import axios from "axios"
import moment from 'moment'
const host = 'localhost:4444';

const AsanaRiver = ({riverView, setRiverView}) => {
  const [chatInput, setChatInput] = useState('')
  const [chatStream, setChatStream] = useState([])
  const [inRiver, setInRiver] = useState(false)


  /********************************************/
  /********** Fetch the Chat Stream! **********/
  /********************************************/
  const fetchChatStream = () => {
    axios({
      method: 'get',
      url: `http://${host}/asana-river/chat`
    })
    .then(({data}) => {
      console.log('Chat stream data:', data);
      setChatStream(data);
    })
    .catch(err => {
      console.log('Error in getting chat data:', err);
      setChatStream(mockStreamData);
    })
  }

  /********************************************/
  /******** Post Chat to Chat Stream! *********/
  /********************************************/
  const handleSendChat = () => {
    //need to get current user as prop
    axios({
      method: 'post',
      url: `http://${host}/asana-river/chat`,
      data: {
        currentUser: 'Bob', // From props hopefully
        message: chatInput,
        submitTime: moment()
      }
    })
    .then(res => {
      setChatInput('')
      fetchChatStream();
    })
    .catch(err => {
      fetchChatStream();
      console.log(err)
    })
  }

  /********************************************/
  /***** Handler for River In/Out Button ******/
  /********************************************/
  const handlePracticeClick = () => {
    let enterRiver; // Retrieved from server
    let practicedTime; // Will this calculate if leaving river
    if (inRiver){
      // If currently in river, leave the river, update user's total time
      practicedTime = moment().diff(enterRiver);
      setInRiver(false)
      return axios.post('/user/practicedTime', {
        practicedTime: practicedTime
      })
      .then(()=>{
        console.log('Successfully posted')
      })
      .catch(err=> {
        console.log(err)
      })
    } else {
      // If not in the river, enter and tell DB what enter time is
      setInRiver(true)
      enterRiver = moment();
    }
  }

  return (
    <div className="practice-room-container">
      <div className="chart-conatainer">
        <Chart view='asana'/>
        <br />
        <div className="center">
          {
          <button className="practice-timer" onClick={handlePracticeClick}> {
            !inRiver ?  'Start your practice'
            :'End your practice'
          }
           </button>

        }
        </div>
      </div>
      <div className="practice-board-container">
        <div className='practice-board'>
        <iframe src="https://open.spotify.com/embed/playlist/3SwVxW3qgPEytBEV4DQ8i8" width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <h2>Tell us about today's practice</h2>
      <input
        className='practice-stream-input'
        type='text'
        value={chatInput}
        onChange={(e) => {
          setChatInput(e.target.value);
        }}>

        </input>
      <button onClick={handleSendChat}>Submit</button>
      <br/><br/>
      <div>
        {chatStream.length ?
        chatStream.map(post => {
          return (
            <div className='practice-stream'>
             {post.user}: {post.post} <span style={{fontSize:'0.2em'}}>{post.postedAt}</span>
             <br/>
            </div>
          )
        })
        :<></>
      }
        </div>
      </div>
      </div>
    </div>
  );
};

export default AsanaRiver;

const mockStreamData = [
  {user: 'nuri' , post: 'Practicing vinyasa', postedAt: 'few seconds ago'},
  {user: 'liam' , post: 'Practicing hatha', postedAt: '2 minutes ago'},
  {user: 'jeremy' , post: 'Practicing bikram', postedAt: '5 minutes ago'},
]