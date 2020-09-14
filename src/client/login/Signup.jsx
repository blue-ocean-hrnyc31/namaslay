import React from 'react';
import { signUp } from '../apiHelpers';
import { Link } from 'react-router-dom';

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
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input type='email' name='email' onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <Link to='/login'>Already have an account?</Link>
      </>
    );
  }
}

export default Signup;
