import React, { useState, useEffect } from "react";
import { GoCalendar } from "react-icons/go";
import axios from 'axios';

const Upcoming = ({ selectedEvent }) => {
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const formatDate = (date) => {
        date = new Date(date);
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    };
    const formatTime = (date) => {
        date = new Date(date);
        let hour = (date.getHours() > 12) ? (date.getHours() -12) : date.getHours();
        let minutes = (date.getMinutes() === 0) ? '00' : date.getMinutes();
        return date.getHours() >= 12 ? hour + ':' + minutes + 'PM' : hour + ':' + minutes + 'AM';
    }
    const getUpcoming = () => {
        return axios.get(`http://34.229.137.235:4444/events/upcoming`)
        .then(({data}) => {
            setUpcomingEvents(data);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        getUpcoming();
    }, []);

  return (
    <div className="event">
      <div className="title"><GoCalendar /> Upcoming Events:</div>
      <div className="upcoming-table">
      <div className="row">
      <div className="date-header" >Date</div>
        <div className="date-header" >Time</div>
        <div className="description-header">Event Description</div>
        </div>
      {upcomingEvents && upcomingEvents.map((upcoming, i) => (
        <div className="row">
            <div className="date-column" >{formatDate(upcoming.start_time)}</div>
            <div className="date-column" >{formatTime(upcoming.start_time)}</div>
            <div className="description-column">{upcoming.title} hosted by {upcoming.host}</div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Upcoming;
