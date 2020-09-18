import React from "react";

const Event = ({ selectedEvent }) => {
  return (
    <div>
      <div className="title1">What's happening</div>
      <div className="description">
        <u>{selectedEvent.title}:</u>
      </div>
      <div className="description">{selectedEvent.description}</div>
      <div className="title2">Where</div>
      <div className="location">{selectedEvent.location}</div>
      <div className="title3">Your instructor</div>
      <div className="instructor">{selectedEvent.event_host}</div>
    </div>
  );
};

export default Event;
