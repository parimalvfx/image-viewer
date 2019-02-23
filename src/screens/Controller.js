import React, { Component } from 'react';
import Login from './login/Login';
import Home from './home/Home';
import Profile from './profile/Profile';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = 'https://api.instagram.com/v1/users/self/';
    }

    render() {
        return (
            <Router>
                <div className='main-container'>

                    {/* route to login page */}
                    <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl} />} />

                    {/* route to home page,
                    if a user is not logged in and tries to go to the home page by changing the URL,
                    then the user is taken back to the login page */}
                    <Route path='/home' render={(props) => (
                        sessionStorage.getItem('access-token') === null ? (
                            <Redirect to='/' />
                        ) : (
                                <Home {...props} baseUrl={this.baseUrl} />
                            )
                    )} />

                    {/* route to profile page,
                    if a user is not logged in and tries to go to the profile page by changing the URL,
                    then the user is taken back to the login page */}
                    <Route path='/profile' render={(props) => (
                        sessionStorage.getItem('access-token') === null ? (
                            <Redirect to='/' />
                        ) : (
                                <Profile {...props} baseUrl={this.baseUrl} />
                            )
                    )} />
                </div>
            </Router>
        )
    }
}

export default Controller;
