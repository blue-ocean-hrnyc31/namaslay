import React from 'react';
import { signUp } from '../apiHelpers';
import { Link } from 'react-router-dom';
import '../stylesheets/loginSignup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      error: false,
      travel: '',
      certification: '',
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
    signUp(firstName, lastName, username, password, email)
      .then((status) => {
        if (status === 201) {
          // HANDLE SUCCESSFUL SIGNUP
          this.props.history.push('/login');
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch((err) => {
        // HANDLE ERROR SIGNUP
        console.log('error signing up:', err);
        this.setState({
          error: true,
        });
      });
    console.log('these values have been submited', this.state);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h3>Signup</h3>
          <label>
            <p>First Name:</p>
            <input type='text' name='firstName' onChange={this.handleChange} />
          </label>
          <label>
            <p>Last Name:</p>
            <input type='text' name='lastName' onChange={this.handleChange} />
          </label>
          <label>
            <p>Username:</p>
            <input type='text' name='username' onChange={this.handleChange} />
          </label>
          <label>
            <p>Password:</p>
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Email:</p>
            <input type='email' name='email' onChange={this.handleChange} />
          </label>
          <label>
            <p>Travels:</p>
            <input type='text' name='travel' onChange={this.handleChange} />
          </label>
          <label>
            <p>Certification:</p>
            <input type='text' name='certification' onChange={this.handleChange} />
          </label>
          <input id='button' type='submit' value='Submit' />
          <Link id='link' to='/login'>Already have an account?</Link>
        </form>
      </>
    );
  }
}

export default Signup;


// - Location (Geolocation based or manually entry)
// - Travel history
// - Certification