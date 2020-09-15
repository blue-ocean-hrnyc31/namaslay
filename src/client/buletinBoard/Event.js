import React from "react";

const Event = ({ selectedEvent }) => {
  return (
    <div className="event">
      <div className="title">What's happening</div>
      <div className="description">{selectedEvent.description}</div>
      <div className="title">Where</div>
      <div className="location">{selectedEvent.location}</div>
      <div className="title">Your instructor</div>
      <div className="location">{selectedEvent.event_host}</div>
    </div>
  );
};

export default Event;
