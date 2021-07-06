import React from 'react';
import { AuthContext } from '../../context/authContext';
import Show from '../auth/show.js'
import SignIn from '../auth/signin';
import { Form, Button, Row, Col } from 'react-bootstrap';

class SignUp extends React.Component {

  static contextType = AuthContext;
  // I have access to this.context

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email:'',
      role:'user'
    }
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    this.context.signUp(this.state.username, 
                        this.state.password, 
                        this.state.email, 
                        this.state.role 
                        );
  }
  render() {

    console.log('signup -------------------- ');

    return (
      <>
        <Show condition={this.context.signedup}>
          <SignIn />
        </Show>
        <Show condition={!this.context.signedup}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  placeholder="Email" />
              </Col>

              <Col>
                <Form.Control
                  name="username"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Username" />

                <Form.Control
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  placeholder="Password" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>admin</option>
                  <option>user</option>
                  <option>writer</option>
                </Form.Control>

                <Button type="submit" 
                        variant="primary"
                        >Sign Up</Button>
              </Col>
            </Row>
          </Form>
        </Show>
      </>
    )
  }
}

export default SignUp;