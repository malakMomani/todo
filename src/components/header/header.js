import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from '../auth/signup.js';
import SignIn from '../auth/signin.js';
import {AuthContext} from '../../context/authContext.js';
import Show from '../auth/show.js';
import {useContext} from 'react';


function Header() {

  const {signedIn, signedUp} = useContext(AuthContext);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
            <Show condition={!signedUp}>
              <SignUp />
            </Show>
            <Show condition={!signedIn && signedUp}>
              <SignIn />
            </Show>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
