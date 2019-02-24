import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageGridList from '../../common/image-grid-list/index'
import ModalBox from '../../common/modal/index'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            USER_DATA: null,
            USER_MEDIA: null,
            openModal: false,
            openDetailModal: false,
            selectedImage: null,
            comment: '',
            full_name: '',
            invalidFullName: false,
            userComments: {},
            likesState: {},
        }
    }

    getOwnerInfo = () => {
        let data = null
        let url = `${this.props.baseUrl}?access_token=${sessionStorage.getItem('access-token')}`
        let xhr = new XMLHttpRequest();
        let self = this
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let OWNER_INFO_DATA = JSON.parse(this.responseText)
                self.setState({ USER_DATA: OWNER_INFO_DATA.data, full_name: OWNER_INFO_DATA.data.full_name })
            }
        }
        xhr.open("GET", url);
        xhr.send(data)
    }

    getOwnerMedia = () => {
        let data = null
        let url = `${this.props.baseUrl}media/recent/?access_token=${sessionStorage.getItem('access-token')}`
        let xhr = new XMLHttpRequest();
        let self = this
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let likesState = {};
                let userComments = {};
                let OWNER_RECENT_MEDIA = JSON.parse(this.responseText).data
                for (let i = 0; i < OWNER_RECENT_MEDIA.length; i++) {
                    likesState[OWNER_RECENT_MEDIA[i]['id']] = false
                    userComments[OWNER_RECENT_MEDIA[i]['id']] = {'added': [], 'toAdd': ''}
                }
                self.setState({
                    USER_MEDIA: OWNER_RECENT_MEDIA,
                    likesState: likesState,
                    userComments: userComments
                })
            }
        }
        xhr.open("GET", url);
        xhr.send(data)
    }

    componentDidMount() {
        this.getOwnerInfo()
        this.getOwnerMedia()

    }

    gridCallbackHandler = (data) => {
        this.setState({ openModal: true, selectedImage: data})
    }

    editFullName = () => {
        this.setState({ openDetailModal: true })
    }

    closeImageModalHandler = () => {
        this.setState({ openModal: false, openDetailModal: false, invalidFullName: false })
    }

    updateFullName = (event) => {
        if (this.state.full_name) {
            event.preventDefault()
            let userdataWithUpdatedName = { ...this.state.USER_DATA, 'full_name': this.state.full_name }
            this.setState({ USER_DATA: userdataWithUpdatedName, invalidFullName: false})
            this.closeImageModalHandler()
        } else {
            this.setState({invalidFullName: true, full_name: this.state.USER_DATA.full_name})
        }
    }

    handleInputChange = inputType => event => {
        this.setState({ [inputType]: event.target.value });
    };

    toggleLikeCount(postId, likeState) {
        let newUserPosts = Object.assign({}, this.state.USER_MEDIA);
        let count = null;
        for (let i = 0; i < Object.keys(newUserPosts).length; i++) {
            if (newUserPosts[i]['id'] === postId) {
                if (likeState) {
                    count = newUserPosts[i].likes.count + 1
                    newUserPosts[i].likes.count = count;
                } else {
                    count = newUserPosts[i].likes.count - 1;
                    newUserPosts[i].likes.count = count;
                }
                break;
            }
        }

        let newLikesState = Object.assign({}, this.state.likesState);
        newLikesState[postId] = likeState;
        this.setState({
            USER_MEDIA: Object.values(newUserPosts),
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

    commentInputChangeHandler = (userComment, postId) => {
        let newUserComments = Object.assign({}, this.state.userComments);
        newUserComments[postId]['toAdd'] = userComment;
        this.setState({userComments: newUserComments});
    }

    addCommentHandler = (postId) => {
        if (this.state.userComments[postId]['toAdd']) {
            let newUserComments = Object.assign({}, this.state.userComments);
            newUserComments[postId]['added'].push(newUserComments[postId]['toAdd']);
            newUserComments[postId]['toAdd'] = ''
            this.setState({userComments: newUserComments});
        }
    }

    logoutHandler = () => {
        // clear session storage
        sessionStorage.clear();

        // redirect to login page
        this.props.history.push("/");
    }

    render() {

        console.log(this.state)

        const userData = this.state.USER_DATA
        const userMedia = this.state.USER_MEDIA
        const { openModal, selectedImage, openDetailModal } = this.state

        return (
            <div style={{marginBottom: 30}}>

                {/* header */}
                {userData && <Header
                    showProfilePicture={true}
                    redirectToHome={true}
                    logoutHandler={this.logoutHandler}
                    profilePictureUrl={userData.profile_picture}
                    baseUrl={this.props.baseUrl}
                />}

                {/* user details */}
                {userData && <div className="container flex-container pd-top-5-per">

                    {/* user profile pitcute */}

                    <img className="profile-pic flex-item" src={userData.profile_picture} alt="profile pic" />
                    <div className="flex-container-column-1">

                        {/* username */}
                        <Typography variant='h5' className="flex-item" style={{display: 'flex'}}>
                            {userData.username}
                        </Typography>

                        {/* user posts, follows and followed by */}
                        <div className="flex-container-1">
                            <p className="flex-1">Posts: {userData.counts.media}</p>
                            <p className="flex-1">Follows: {userData.counts.follows}</p>
                            <p className="flex-2">Followed By: {userData.counts.followed_by}</p>
                        </div>

                        <div className="flex-container">

                            {/* user full name */}
                            <Typography variant='h6' className="flex-item" style={{display: 'flex', marginTop: 15}}>
                                {userData.full_name}
                            </Typography>

                            {/* user full name edit button */}
                            {/* the `fab` variant will be removed from Button in the next major release. The `<Fab>` component is equivalent and should be used instead. */}
                            {/* using Fab component instead of Button as given in problem statement due to warning by Material-UI */}
                            <Fab color='secondary' className={'editBtn'} onClick={this.editFullName}>
                                <EditIcon />
                            </Fab>

                            {/* modal to edit user full name */}
                            <ModalBox openModal={openDetailModal} closeModal={this.closeImageModalHandler} widthClass={'userDetailModalClass'}>
                                <div className="flex-container-column justify-content-end">
                                    <FormControl className="flex-container">
                                        <Typography variant='h5' style={{marginBottom: 30}}>Edit</Typography>
                                        <TextField
                                            id="fullName"
                                            label="Full Name *"
                                            placeholder="Full Name *"
                                            margin="normal"
                                            onChange={this.handleInputChange('full_name')}
                                            value={this.state.invalidFullName ? '' : this.state.full_name}
                                            style={{ width: "100%" }}
                                        />
                                        {this.state.invalidFullName ? <FormHelperText style={{color: 'red'}}>required</FormHelperText> : ''}
                                    </FormControl>
                                </div>
                                <Button type="submit" variant="contained" className={'addBtn'} color="primary" onClick={this.updateFullName}>UPDATE</Button>
                            </ModalBox>
                        </div>
                    </div>
                </div>}

                {/* image posts grid list */}
                {userMedia && <ImageGridList tileData={userMedia} gridCallback={this.gridCallbackHandler} />}

                {/* image modal */}
                <ModalBox openModal={openModal} closeModal={this.closeImageModalHandler} widthClass={'imageModalClass'}>
                    {selectedImage && <div className="flex-container">

                        {/* standard resolution image */}
                        <div className="margin-right-2-per">
                            <img className="modalImage" src={selectedImage.images.standard_resolution.url} alt="selected pic" />
                        </div>

                        <div className="flex-container-column">

                            {/* profile picture and username */}
                            <div className="flex-container">
                                <img className="modal-user-image" src={userData.profile_picture} alt="profile pic" />
                                <h4 className="margin-10px">{userData.username}</h4>
                            </div>

                            {/* horizontal line */}
                            <hr />

                            {/* caption */}
                            <Typography variant='subtitle1'>
                                {selectedImage.caption.text.split('\n')[0]}
                            </Typography>


                            {/* hashtags */}
                            {selectedImage.tags && selectedImage.tags.length > 0 &&
                            <Typography style={{color: '#82C0FF'}} variant='subtitle2'>
                                {selectedImage.tags.map(function (t) { return `#${t} ` })}
                            </Typography>}

                            {/* comments */}
                            <List style={{marginTop: '-5%', marginLeft: -10}}>
                                {this.state.userComments[selectedImage.id]['added'].map((userComment, index) => (
                                    <ListItem key={selectedImage.id + 'comment' + index} style={{marginBottom: -20}}>
                                        <Typography variant='body1' style={{fontWeight: 'bold'}}>{selectedImage.user.username}:</Typography>
                                        <Typography variant='subtitle1' style={{marginLeft: 5}}>{userComment}</Typography>
                                    </ListItem>
                                ))}
                            </List>

                            <div className="flex-container-column justify-content-end">

                                {/* like icon and counts */}
                                <div className="flex-container-2">
                                    <Grid container={true} direction='row' alignItems='center'>
                                        <Grid item={true} style={{marginTop: 5}}>
                                            <IconButton onClick={() => this.likeHandler(selectedImage.id)}>
                                                {this.state.likesState[selectedImage.id] ?
                                                    <FavoriteIcon nativeColor='red' fontSize='large' /> :
                                                    <FavoriteBorderIcon nativeColor='black' fontSize='large' />
                                                }
                                            </IconButton>
                                        </Grid>
                                        <Grid item={true}>
                                            <Typography style={{marginTop: '10%', fontWeight: 'bold', marginLeft: 5}} variant='body2'>
                                                {selectedImage.likes.count} likes
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>

                                {/* add comment input and button */}
                                <form className="flex-container">
                                    <TextField
                                        id="comment"
                                        label="Add a comment"
                                        placeholder="Add a comment"
                                        margin="normal"
                                        onChange={(event) => this.commentInputChangeHandler(event.target.value, selectedImage.id)}
                                        value={this.state.userComments[selectedImage.id]['toAdd']}
                                        style={{ flex: 1 }}
                                    />
                                    <Button variant="contained" className={'addBtn'} color="primary" onClick={() => this.addCommentHandler(selectedImage.id)}>Add</Button>
                                </form>
                            </div>
                        </div>
                    </div>}
                </ModalBox>
            </div>
        )
    }
}

export default Profile;
