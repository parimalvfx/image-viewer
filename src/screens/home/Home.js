import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { Redirect } from 'react-router-dom';

class Home extends Component {

    constructor() {
        super();
        sessionStorage.setItem('access-token', '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65');
        // sessionStorage.removeItem('access-token');
        this.state = {
        }
    }

    render() {

        // if a user is not logged in and tries to go to the home page by changing the URL,
        // then the user is taken back to the login page
        if (sessionStorage.getItem('access-token') == null) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Header showSearchBox='true' showProfilePicture='true' />
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home;
