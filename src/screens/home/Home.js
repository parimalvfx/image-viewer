import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 500,
        marginTop: 20,
        marginLeft: 20,
    },
    cardHeaderTitle: {
        fontWeight: 'bold',
    },
    cardHeaderSubheader: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor: '#c0c0c0'
    },
    caption: {
        fontWeight: 'bold',
    },
    tags: {
        // fontWeight: 'bold',
        color: '#82C0FF',
    }
});

class Home extends Component {

    constructor() {
        super();
        sessionStorage.setItem('access-token', '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65');
        // sessionStorage.removeItem('access-token');
        this.state = {
            username: 'upgrad_sde',
            caption: 'PG Certification in Digital Marketing & Communication\n#upgrad #marketingdigital #pgcertified',
            tags: ['pgcertified', 'upgrad', 'marketingdigital'],
        }
    }

    prettyTimestamp(unixTimestamp) {

        // created_time which is unix timestamp multiplied by 1000 so that the time is in milliseconds, not seconds
        let dateObject = new Date(unixTimestamp * 1000);
        let timeDict = {
            date: dateObject.getDate(),
            month: dateObject.getMonth() + 1,
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
                    <CardHeader
                        classes={{
                            title: classes.cardHeaderTitle,
                            subheader: classes.cardHeaderSubheader,
                        }}

                        // card header - user profile picture
                        avatar={
                            <Avatar alt='Profile picture' src='https://scontent.cdninstagram.com/vp/75dc65cfd2fa6001f7c1171f2a68c8ae/5CF96F17/t51.2885-19/s150x150/41947221_725500971134637_2241518422187835392_n.jpg?_nc_ht=scontent.cdninstagram.com' />
                        }

                        // card header - username
                        title={this.state.username}

                        // card header - created date
                        subheader={this.prettyTimestamp(1538563044)}
                    />
                    <CardContent>

                        {/* card content - image */}
                        <CardMedia
                            className={classes.cardMedia}
                            image='http://scontent.cdninstagram.com/vp/dbac63005a92b42f4b699bcaf3d0ba3d/5CEB874D/t51.2885-15/e35/41949776_232276890980498_7193467884958027372_n.jpg?_nc_ht=scontent.cdninstagram.com'
                            title='PG Certification in Digital Marketing & Communication\n#upgrad #marketingdigital #pgcertified'
                        />

                        {/* card content - horizontal rule */}
                        <Divider className={classes.divider} />

                        <Typography className={classes.caption} variant='subtitle1'>
                            {this.state.caption.split('\n')[0]}
                        </Typography>

                        <Typography className={classes.tags} variant='subtitle2'>
                            {this.state.tags.map(function(t){return '#' + t + ' '})}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
