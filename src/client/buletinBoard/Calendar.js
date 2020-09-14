import React from "react";
import Event from "./Event.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../stylesheets/events.scss";
import axios from "axios";
import Modal from "react-modal";

const localizer = momentLocalizer(moment);

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      events: [
        {
          title: "Some title",
          start: new Date(2020, 8, 14, 10, 0),
          end: new Date(2020, 8, 14, 12, 0),
          location: "zoom link",
          event_host: "Jane Doe",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
        {
          title: "One more",
          start: new Date(2020, 8, 15, 10, 0),
          end: new Date(2020, 8, 15, 12, 0),
          location: "zoom link",
          event_host: "Jane Doe",
          description:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
          title: "Test event",
          start: new Date(2020, 8, 18, 10, 0),
          end: new Date(2020, 8, 18, 12, 0),
          location: "zoom link",
          event_host: "Jane Doe",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
      ],
      selectedEvent: {
        title: "Test event",
        start: new Date(2020, 8, 18, 10, 0),
        end: new Date(2020, 8, 18, 12, 0),
        location: "zoom link",
        event_host: "Jane Doe",
        description:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  convertDate(date) {
    return moment.utc(date).toDate();
  }

  componentDidMount() {
    // axios
    //   .get("http://localhost:3000/events")
    //   .then(({ data }) => {
    //     console.log(data);
    //     this.setState({
    //       events: data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("error getting events: ", err);
    //   });
  }

  handleClick() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <>
        <div className="calendar">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onSelectEvent={(selected) =>
              this.setState({ selectedEvent: selected })
            }
          />
          <button onClick={this.handleClick}>New Event</button>
        </div>
        <div className="event-container">
          <Event selectedEvent={this.state.selectedEvent} />
        </div>
      </>
    );
  }
}

export default Events;
