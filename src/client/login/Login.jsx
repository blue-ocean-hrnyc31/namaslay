import React from 'react';

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

    console.log('this values have been submited', this.state);
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} >
        <h3>Login</h3>
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