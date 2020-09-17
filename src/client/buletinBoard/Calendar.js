import React from "react";
import Event from "./Event.js";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../stylesheets/events.scss";
import axios from "axios";
import NewEventModal from "./NewEventModal.js";
import Upcoming from './Upcoming.jsx';
//sample data
import data from "./data.js";
const localizer = momentLocalizer(moment);

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      events: [],
      selectedEvent: {},
      selectedDate: new Date(),
    };
    this.setModalShow = this.setModalShow.bind(this);
    this.submitNewEntry = this.submitNewEntry.bind(this);
  }

  convertDate(date) {
    return moment.utc(date).toDate();
  }

  componentDidMount() {
    axios
      .get(`http://34.229.137.235:4444/events`)
      .then(({ data }) => {
        let events = data.reduce((acc, cur) => {
          let obj = {
            title: cur.title,
            startDate: new Date(cur.start_time),
            endDate: new Date(cur.end_time),
            location: cur.location,
            event_host: cur.host,
            description: cur.description,
          };
          acc.push(obj);
          return acc;
        }, []);
        this.setState({
          events: events,
        });
      })
      .catch((err) => {
        console.log("error getting events: ", err);
      });
  }

  submitNewEntry(entry) {
    axios
      .post(`http://34.229.137.235:4444/events`, {
        title: entry.title,
        description: entry.description,
        start: entry.start,
        end: entry.end,
        location: entry.location,
        host: entry.event_host,
      })
      .then(({ data }) => {
        let events = data.map((event) => {
          event = {
            title: event.title,
            startDate: new Date(event.start_time),
            endDate: new Date(event.end_time),
            location: event.location,
            event_host: event.host,
            description: event.description,
          };
          return event;
        });
        this.setState({
          events: events,
        });
      })
      .catch((err) => {
        console.log("error getting events: ", err);
      });
  }

  setModalShow(bool) {
    this.setState({ modalIsOpen: bool });
  }

  render() {
    return (
      <>
        <div className="calendar-container">
          <Calendar
            className="calendar"
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            views={["month", "day"]}
            events={this.state.events}
            onSelectEvent={(selected) =>
              this.setState({ selectedEvent: selected })
            }
            onNavigate={(date) => {
              this.setState({ selectedDate: date });
            }}
            date={this.state.selectedDay}
            startAccessor="startDate"
            endAccessor="endDate"
          />
          {this.props.isUserLogged ? (
            <button
              className="add-event"
              onClick={() => this.setModalShow(true)}
            >
              New Event
            </button>
          ) : null}

          <NewEventModal
            show={this.state.modalIsOpen}
            onHide={() => this.setModalShow(false)}
            submitNewEntry={this.submitNewEntry}
          />
        </div>
        <div className="event-container">
          {Object.keys(this.state.selectedEvent).length ? 
          <Event selectedEvent={this.state.selectedEvent} /> :
          <Upcoming selectedEvent={this.state.selectedEvent} />}
        </div>
      </>
    );
  }
}

export default Events;
