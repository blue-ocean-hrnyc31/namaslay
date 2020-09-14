import React, { useState, useEffect } from "react";
import Chart from "./index";
import "../stylesheets/river.scss";
import axios from "axios"
import moment from 'moment'

const MeditationRiver = () => {
  const [inputValue, setInputValue] = useState('')
  const [postStream, setPostStream] = useState(mockStreamData)
  const [inRiver, setInRiver] = useState(false)

  const handleInputChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }
  //fetch user posts in the stream
  const fetchStream = () => {
    return axios.get('/meditation-river/stream')
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
    riverView==="meditation"
    return axios.post('/meditation-river/post', {
      currentUser: '',
      meditationPost: inputValue,
      submitTime: moment()
    })
    .then(()=> {
      setInputValue('')
      fetchStream()
    })
    .catch(err=> {
      console.log(err)
    })
  }

  const handlePracticeClick = () => {
    let enterRiver;
    let practicedTime;
    if (inRiver){
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
      setInRiver(true)
      enterRiver = moment();
    }
  }


  return (
    <div className="practice-room-container">
      <div className="chart-conatainer">
        <Chart view='meditation'/>
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
        <h2>Tell us about today's practice</h2>
      <input className='practice-stream-input' type='text' value={inputValue} onChange={handleInputChange}></input>
      <input type='submit' onSubmit={handleInputSubmit}></input>
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

export default MeditationRiver ;

const mockStreamData = [
  {user: 'nuri' , post: 'Practicing mindfulness', postedAt: 'few seconds ago'},
  {user: 'liam' , post: 'Practicing mindfulness', postedAt: '2 minutes ago'},
  {user: 'jeremy' , post: 'Practicing mindfulness', postedAt: '5 minutes ago'},
]
