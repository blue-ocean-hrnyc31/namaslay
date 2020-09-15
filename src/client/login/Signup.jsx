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
      confirmPassword: '',
      email: '',
      error: '',
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
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({
        error: 'passwords do not match',
      });
    }
    const { firstName, lastName, username, password, email } = this.state;
    signUp(firstName, lastName, username, password, email)
      .then((response) => {
        if (response.status === 201) {
          // HANDLE SUCCESSFUL SIGNUP
          this.props.history.push('/login');
        } else {
          this.setState({
            error: response.data.error,
          });
        }
      })
      .catch((err) => {
        // HANDLE ERROR SIGNUP
        console.log(err.response.data);
        this.setState({
          error: err.response.data.error,
        });
      });
    console.log('these values have been submited', this.state);
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h3>Signup</h3>
          <div className='form-error'>
            {this.state.error && this.state.error}
          </div>
          <label>
            <p>First Name:</p>
            <input
              type='text'
              name='firstName'
              onChange={this.handleChange}
              className='login-input'
            />
          </label>
          <label>
            <p>Last Name:</p>
            <input
              type='text'
              name='lastName'
              onChange={this.handleChange}
              className='login-input'
            />
          </label>
          <label>
            <p>Username:</p>
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
              className={
                this.state.error.includes('username')
                  ? 'login-input login-error'
                  : 'login-input'
              }
            />
          </label>
          <label>
            <p>Password:</p>
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
              className={
                this.state.error.includes('password')
                  ? 'login-input login-error'
                  : 'login-input'
              }
            />
          </label>
          <label>
            <p>Confirm Password:</p>
            <input
              type='password'
              name='confirmPassword'
              onChange={this.handleChange}
              className={
                this.state.error.includes('password')
                  ? 'login-input login-error'
                  : 'login-input'
              }
            />
          </label>
          <label>
            <p>Email:</p>
            <input
              type='email'
              name='email'
              onChange={this.handleChange}
              className='login-input'
            />
          </label>
          <input id='button' type='submit' value='Submit' />
          <Link id='link' to='/login'>
            Already have an account?
          </Link>
        </form>
      </>
    );
  }
}

export default Signup;
