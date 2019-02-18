import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    card: {
        maxWidth: 400,
        marginTop: 20,
        marginLeft: 20,
    },
    cardHeader: {
        fontWeight: 'bold',
    },
});

class Home extends Component {

    constructor() {
        super();
        sessionStorage.setItem('access-token', '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65');
        // sessionStorage.removeItem('access-token');
        this.state = {
            username: 'Foo',
        }
    }

    prettyTimestamp(unixTimestamp) {

        // created_time which is unix timestamp multiplied by 1000 so that the time is in milliseconds, not seconds
        let dateObject = new Date(unixTimestamp * 1000);
        let timeDict = {
            date: dateObject.getDate(),
            month: dateObject.getMonth(),
            year: dateObject.getFullYear(),
            hours: dateObject.getHours(),
            minutes: dateObject.getMinutes(),
            seconds: dateObject.getSeconds()
        }

        // prepend 0 to single digits
        let timeKeys = Object.keys(timeDict);
        for (var i = 0; i < timeKeys.length; i++) {
            let timeValue = timeDict[timeKeys[i]];
            timeDict[timeKeys[i]] = timeValue < 10 ? '0' + timeValue : timeValue;
        }
        return `${timeDict.date}/${timeDict.month}/${timeDict.year} ${timeDict.hours}:${timeDict.minutes}:${timeDict.hours}`;
    }

    render() {

        // if a user is not logged in and tries to go to the home page by changing the URL,
        // then the user is taken back to the login page
        if (sessionStorage.getItem('access-token') == null) {
            return <Redirect to='/' />
        }

        const { classes } = this.props;

        return (
            <div>
                <Header showSearchBox='true' showProfilePicture='true' showMyAccountMenu='true' baseUrl={this.props.baseUrl} />
                <Card className={classes.card}>
                    <CardHeader className={classes.cardHeader}
                        avatar={
                            <Avatar alt='Profile picture' src='https://scontent.cdninstagram.com/vp/75dc65cfd2fa6001f7c1171f2a68c8ae/5CF96F17/t51.2885-19/s150x150/41947221_725500971134637_2241518422187835392_n.jpg?_nc_ht=scontent.cdninstagram.com' />
                        }
                        title={this.state.username}
                        // OCTOBER 3, 2018
                        // created_time which is unix timestamp multiplied by 1000 so that the time is in milliseconds, not seconds
                        subheader={this.prettyTimestamp(1538563044)}
                    />
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
