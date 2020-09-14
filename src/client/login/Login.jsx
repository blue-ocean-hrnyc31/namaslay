import React from 'react';
import { logIn } from '../apiHelpers';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from './auth.js';
import '../stylesheets/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('login route props:', props);
    this.state = {
      username: '',
      password: '',
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
    logIn(this.state.username, this.state.password)
      .then((status) => {
        if (status === 200) {
          this.props.handleLog(true); // set app logged in state to true
          this.props.history.push('/');
        } else {
          this.setState({ error: true });
        }
      })
      .catch((err) => {
        console.log('error logging in:', err);
        // HANDLE INCORRECT CREDENTIALS
        this.setState({ error: true });
      });
  }

  render() {
    const token = this.context.authTokens;
    const setAuthTokens = this.context.setAuthTokens;
    if (token && token !== 'undefined') {
      return <Redirect to='/' />;
    }
    return (
      <>
        <form id='login' onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <label>
            Username:
            <input
              type='text'
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>

          <label>
            Password:
            <input
              type='text'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <Link to='/signup'>Don't have an account?</Link>
        {this.state.error && (
          <div>The username or password provided were incorrect!</div>
        )}
      </>
    );
  }
}

Login.contextType = AuthContext;

export default Login;

Login.propTypes = {
  handleLog: PropTypes.func.isRequired,
};
