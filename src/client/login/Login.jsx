import React from 'react';
import { logIn } from '../apiHelpers';
import '../stylesheets/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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
    logIn(this.state.username, this.state.password, this.props.handleLog);
  }

  render() {
    return (
      <form id='login' onSubmit={this.handleSubmit}>
        <h3>Login</h3>
        <label>
          Username:
          <input
            type='text'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            value={this.state.username}
          />
        </label>

        <label>
          Password:
          <input
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            value={this.state.password}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default Login;
