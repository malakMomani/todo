import React from 'react';
import {useContext} from 'react';
import {AuthContext} from '../../context/authContext';
import Show from '../auth/show.js';


function Auth(props) {
    const {signedIn, validateAction} = useContext(AuthContext);
    // loggedIn && has action access 
    return (
        <Show condition={signedIn && validateAction(props.action)}>
            {props.children}
        </Show>
    )
}

export default Auth;