import React from 'react';
import { AuthContext } from '../../context/authContext';
import Show from '../auth/show.js'

class SignIn extends React.Component {

  static contextType = AuthContext;
  // I have access to this.context

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    this.context.login(this.state.username, this.state.password);
  }

  render() {
    console.log('login -------------------- ');
    return (
      <>
        <Show condition={this.context.signedIn}>
          <button onClick={this.context.logout}>Logout</button>
        </Show>
        <Show condition={!this.context.signedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              name="username"
              type="text"
              onChange={this.handleChange} />
            <input
              name="password"
              type="password"
              onChange={this.handleChange} />
            <button type="submit">SignIn</button>
          </form>
        </Show>
      </>
    )
  }
}

export default SignIn;