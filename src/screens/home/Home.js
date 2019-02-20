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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import indigo from '@material-ui/core/colors/indigo';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    cardsGridList: {
        width: '80%',
    },
    card: {
        maxWidth: 500,
        marginTop: 20,
        marginBottom: 10,
        // marginLeft: 20,
    },
    cardHeaderTitle: {
        fontWeight: 'bold',
    },
    cardHeaderSubheader: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardMedia: {
        // TODO - aspect ratio
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
    },
    favoriteIcon: {
        marginTop: 10,
    },
    likesCount: {
        marginTop: 5,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    commentForm: {
        width: '80%',
    },
    commentLabel: {
        '&$commentFocused': {
            color: indigo[500],
        },
    },
    commentFocused: {},
    commentInputUnderline: {
        '&:after': {
            borderBottomColor: indigo[500],
        },
    },
    commentButton: {
        marginTop: 15,
        marginLeft: 10,
    },
});

class Home extends Component {

    constructor() {
        super();
        sessionStorage.setItem('access-token', '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65');
        // sessionStorage.removeItem('access-token');
        this.state = {
            userPosts: [],
            filteredUserPosts: [],
            likesState: {},
        }
    }

    componentWillMount() {
        // Get all posts by user
        let dataUserPosts = null;
        let xhrUserPosts = new XMLHttpRequest();
        let that = this;
        xhrUserPosts.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let likesState = {}
                JSON.parse(this.responseText).data.map(post => (
                    likesState[post.id] = false
                ));
                that.setState({
                    userPosts: JSON.parse(this.responseText).data,
                    filteredUserPosts: JSON.parse(this.responseText).data,
                    likesState: likesState,
                });
            }
        });
        xhrUserPosts.open('GET', `${this.props.baseUrl}media/recent/?access_token=${sessionStorage.getItem('access-token')}`);
        xhrUserPosts.send(dataUserPosts);
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

    myAccountHandler = () => {
        // redirect to profile page
        this.props.history.push('/profile');
    }

    logoutHandler = () => {
        // clear session storage
        sessionStorage.clear();

        // redirect to login page
        this.props.history.push("/");
    }

    searchHandler = (event) => {
        let resultPosts = this.state.userPosts.filter(function (post) {
            return post.caption.text.split('\n')[0].toLowerCase().includes(event.target.value.toLowerCase());
        });
        this.setState({ filteredUserPosts: resultPosts });
    }

    toggleLikeCount(postId, likeState) {
        let newUserPosts = Object.assign({}, this.state.userPosts);
        for (var i = 0; i < Object.keys(newUserPosts).length; i++) {
            if (newUserPosts[i]['id'] === postId) {
                if (likeState) {
                    newUserPosts[i].likes.count = newUserPosts[i].likes.count+1;
                    console.log(newUserPosts[i].likes.count)
                } else {
                    newUserPosts[i].likes.count = newUserPosts[i].likes.count-1;
                    console.log(newUserPosts[i].likes.count)
                }
                break;
            }
        }
        let newLikesState = Object.assign({}, this.state.likesState);
        newLikesState[postId] = likeState;
        this.setState({
            userPosts: Object.values(newUserPosts),
            likesState: newLikesState,
        });
    }

    likeHandler = (postId) => {
        if (this.state.likesState[postId]) {
            // decrement like
            this.toggleLikeCount(postId, false);
        }
        else {
            // increment like
            this.toggleLikeCount(postId, true);
        }
    }

    render() {

        // if a user is not logged in and tries to go to the home page by changing the URL,
        // then the user is taken back to the login page
        if (sessionStorage.getItem('access-token') == null) {
            return <Redirect to='/' />
        }

        const { classes } = this.props;

        console.log(this.state);

        return (
            <div>

                <Header
                    showSearchBox='true'
                    showProfilePicture='true'
                    showMyAccountMenu='true'
                    myAccountHandler={this.myAccountHandler}
                    logoutHandler={this.logoutHandler}
                    searchHandler={this.searchHandler}
                    baseUrl={this.props.baseUrl}
                />

                <div id='cards-grid-list'>
                    <GridList cols={2} cellHeight='auto' className={classes.cardsGridList}>
                        {this.state.filteredUserPosts.map(post => (
                            <GridListTile key={'post' + post.id}>

                                <Card className={classes.card}>
                                    <CardHeader
                                        classes={{
                                            title: classes.cardHeaderTitle,
                                            subheader: classes.cardHeaderSubheader,
                                        }}

                                        // card header - user profile picture
                                        avatar={
                                            <Avatar alt='Profile picture' src={post.user.profile_picture} />
                                        }

                                        // card header - username
                                        title={post.user.username}

                                        // card header - created date
                                        subheader={this.prettyTimestamp(post.created_time)}
                                    />
                                    <CardContent>

                                        {/* card content - image */}
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={post.images.standard_resolution.url}
                                            title={post.caption.text}
                                        />
                                        {/* TODO */}
                                        {/* <img src={post.images.standard_resolution.url} style={{maxWidth:'100%', maxHeight:'100%'}} /> */}

                                        {/* card content - horizontal rule */}
                                        <Divider className={classes.divider} />

                                        {/* card content - caption of the image*/}
                                        <Typography className={classes.caption} variant='subtitle1'>
                                            {post.caption.text.split('\n')[0]}
                                        </Typography>

                                        {/* card content - hashtags */}
                                        <Typography className={classes.tags} variant='subtitle2'>
                                            {post.tags.map(function (t) { return `#${t} ` })}
                                        </Typography>

                                        {/* card content - like icon and count */}
                                        <Grid container={true} direction='row' alignItems='center'>
                                            <Grid item={true}>
                                                <FavoriteBorderIcon
                                                    className={classes.favoriteIcon}
                                                    onClick={() => this.likeHandler(post.id)}
                                                />
                                            </Grid>
                                            <Grid item={true}>
                                                <Typography className={classes.likesCount} variant='body2'>
                                                    {post.likes.count} likes
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {/* card content - add comment */}
                                        <div id='comment-div'>
                                            <FormControl className={classes.commentForm}>
                                                <InputLabel
                                                    // htmlFor="custom-css-standard-input"
                                                    classes={{
                                                        root: classes.commentLabel,
                                                        focused: classes.commentFocused,
                                                    }}
                                                >
                                                    Add a comment
                                                </InputLabel>
                                                <Input
                                                    classes={{
                                                        underline: classes.commentInputUnderline,
                                                    }}
                                                />
                                            </FormControl>
                                            <Button className={classes.commentButton} variant='contained' color='primary'>
                                                ADD
                                            </Button>
                                        </div>

                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Home);
