import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DateTimePicker from "react-datetime-picker";

class NewEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      location: "",
      event_host: "",
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleStartChange(event) {
    this.setState({
      start: event.target.value,
    });
  }

  handleEndChange(event) {
    this.setState({
      end: event.target.value,
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value,
    });
  }

  handleHostChange(event) {
    this.setState({
      event_host: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    this.props.submitNewEntry(this.state);
    this.setState({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      location: "",
      event_host: "",
    });
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a new event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Event title</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Full description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event starts</Form.Label>
              <DateTimePicker value={this.state.start} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event ends</Form.Label>
              <DateTimePicker value={this.state.start} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Event location</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.state.location}
                onChange={this.handleLocationChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Event host</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.state.event_host}
                onChange={this.handleHostChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default NewEventModal;
