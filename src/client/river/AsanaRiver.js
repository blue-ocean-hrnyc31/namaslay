import React, { useState, useEffect } from "react";
import Chart from "./index";
import "../stylesheets/river.scss";
import axios from "axios"
import moment from 'moment'

const AsanaRiver = ({riverView, setRiverView}) => {
  const [inputValue, setInputValue] = useState('')
  const [postStream, setPostStream] = useState(mockStreamData)
  const [inRiver, setInRiver] = useState(false)

  const handleInputChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }
  //fetch user posts in the stream
  const fetchStream = () => {
    return axios.get('/asana-river/stream')
    console.log(data)
    .then(({data}) => {
      setPostStream(data)
    })
    .catch(err=> {
      console.log(err)
    })
  }

  //post current user's practice to the stream
  //need to get current user as prop
  const handleInputSubmit = (e) => {
    e.preventDefault()
    //riverView==="asana"
    return axios.post('/asana-river/post', {
      currentUser: '',
      meditationPost: inputValue,
      submitTime: moment()
    })
    .then(()=> {
      console.log('Hello')
      setInputValue('')
      fetchStream()
    })
    .catch(err=> {
      console.log(err)
    })
  }

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
      <input className='practice-stream-input' type='text' value={inputValue} onChange={handleInputChange}></input>
      <button onClick={handleInputSubmit}>Submit</button>
      <br/><br/>
      <div >
        {postStream.length ?
        postStream.map(post => {
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