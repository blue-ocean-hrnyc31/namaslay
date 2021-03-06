import React from 'react';
import { logIn } from '../apiHelpers';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from './auth.js';
import '../stylesheets/loginSignup.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // console.log('login route props:', props);
    this.state = {
      username: '',
      password: '',
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('history', this.props.history);
    console.log('location', this.props.location);
    const name = e.target.name;
    const newState = { [name]: e.target.value };
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    logIn(this.state.username, this.state.password, this.props.handleUser)
      .then((status) => {
        console.log('status in login.jsx:', status);
        if (status === 200) {
          this.props.handleLog(true);
          // console.log('history', this.props.history);
          // console.log('history.length', this.props.history.length);
          // set app logged in state to true
          this.props.history.push(this.props.redirectPath);
          // this.props.history.goBack();
        } else {
          this.setState({ error: status });
        }
      })
      .catch((err) => {
        console.log('error logging in:');
        console.log(err.response.status);
        // HANDLE INCORRECT CREDENTIALS
        this.setState({ error: err.response.status });
        document.cookie =
          'connect.sid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });
  }

  render() {
    const token = this.context.authTokens;
    const setAuthTokens = this.context.setAuthTokens;
    if (token) {
      return <Redirect to='/' />;
    }
    return (
      <>
        <form id='login' onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          {this.state.error === 401 && (
            <div className='form-error'>
              The username or password provided were incorrect!
            </div>
          )}
          {this.state.error === 503 && (
            <div className='form-error'>503 ERROR: SERVER</div>
          )}
          <input
            type='text'
            name='username'
            onChange={this.handleChange}
            value={this.state.username}
            placeholder='Username'
            className='login-input'
          />

          <input
            type='password'
            name='password'
            onChange={this.handleChange}
            value={this.state.password}
            placeholder='Password'
            className='login-input'
          />
          <input id='button' type='submit' value='Sign In' />
          <Link id='link' to='/signup'>
            Don't have an account?
          </Link>
        </form>
      </>
    );
  }
}

Login.contextType = AuthContext;

export default Login;

Login.propTypes = {
  handleLog: PropTypes.func.isRequired,
};
