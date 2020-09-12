import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const newState = {[name]: e.target.value};
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('/signup', {username: this.state.username, password: this.state.password})
    .then(response => {
      if (response.data === 'success') {
        this.props.handleLog(true);
      }
    });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} >
        <h3>Signup</h3>
        <label>
          Username:
          <input
            type='text'
            name='username'
            onChange={this.handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type='text'
            name='password'
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>

    );
  };

}

export default Login;