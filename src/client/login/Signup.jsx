import React from 'react';
import { signUp } from '../apiHelpers';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const newState = { [name]: e.target.value };
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, username, password, email } = this.state;
    signUp(firstName, lastName, username, password, email, this.props.handleLog).then((err) => {
      if (err) {
        /* This IS TEMPORARY. MUST CHANGE!!!! */
        console.log(err);
      }
    });
    // console.log('this values have been submited', this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Signup</h3>
        <label>
          First Name:
          <input type='text' name='firstName' onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input type='text' name='lastName' onChange={this.handleChange} />
        </label>
        <label>
          Username:
          <input type='text' name='username' onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type='password' name='password' onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type='email' name='email' onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Signup;
