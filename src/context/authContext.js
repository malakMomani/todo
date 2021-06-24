import React from 'react';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

const API_SERVER = 'https://malak-auth-api.herokuapp.com';

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedup: false,
            signedIn: false,
            signIn: this.signIn,
            signOut: this.signOut,
            signUp: this.signUp,
            user: {},
            capabilities: [],
            validateAction: this.validateAction
        }
    }

    signIn = async (username, password) => {
        // send username:password encoded -> add them to the Authorization header
        // prefixed with Basic XXXencoded_valueXXX
        const encoded = base64.encode(`${username}:${password}`);
        const result = await fetch(`${API_SERVER}/signin`, {
            method: 'post',
            headers: { Authorization: `Basic ${encoded}` }
        });

        let data = await result.json();
        console.log(data);
        this.validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
    }

    validateToken = (token) => {
        // jwt.verify with the secret.
        const user = jwt.decode(token); // not very recommended
        if (user) {
            this.setAuthState(true, user, token);
        }
    }

    setAuthState = (signedIn, user, token) => {
        this.setState({ signedIn, user });
        // add the token to the browser cookies
        cookie.save('auth-token', token);
    }

    signOut = () => {
        this.setAuthState(false, {}, null);
    }

    componentDidMount = () => {
        // functional component, useEffect -> inital render
        console.log("component did mount")
        const token = cookie.load('auth-token'); // read the cookie from browser
        this.validateToken(token);
    }

    validateAction = (action) => {
        console.log(this.state.user)
        return this.state.user.capabilities.includes(action);
    }

    signUp = async (username, password, email, role) => {
        // send username:password encoded -> add them to the Authorization header
        // prefixed with Basic XXXencoded_valueXXX
        const body = {
            username: username,
            password: password,
            email: email,
            role: role
        }
        console.log('fetch with ', API_SERVER + '/signup')
        const result = await fetch(`${API_SERVER}/signup`, {
            method: 'post',
            body: JSON.stringify(body)
        });

        console.log('problem ---------------');
        let data = await result.json();
        console.log(data);
        this.validateToken(data.token);
        // verify ==> with the secret
        // decode ==> does not need the secret
        console.log(username, 'user sign up');
    }

    render() {
        return (
            <AuthContext.Provider value={this.state}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthProvider;