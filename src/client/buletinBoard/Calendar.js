import React from "react";
import Event from "./Event.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../stylesheets/events.scss";

const localizer = momentLocalizer(moment);

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          title: "Some title",
          start: new Date(2020, 14, 8),
          end: new Date(2020, 14, 8),
          location: "zoom link",
          event_host: "Jane Doe",
        },
      ],
    };
  }

  render() {
    return (
      <div className="events">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: "100vh" }}
          />
        </div>
        <div className="event"></div>
      </div>
    );
  }
}

export default Events;
