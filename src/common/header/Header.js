import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    handleToggle = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({open: false});
    };

    myAccountHandler = (e) => {
        // handleClose
        this.handleClose(e);

        // redirect to profile page
        this.props.myAccountHandler();
    }

    logoutHandler = (e) => {
        // handleClose
        this.handleClose(e);

        // clear session storage and redirect to login page
        this.props.logoutHandler();
    }

    render() {
        const {open} = this.state;
        return (
            <div>
                <header className='app-header'>

                    {/* app logo */}
                    {this.props.redirectToHome ?
                        <Link to='/home'>
                            <span className='app-logo'>Image Viewer</span>
                        </Link>
                        :
                        <span className='app-logo'>Image Viewer</span>
                    }

                    {/* user profile icon */}
                    {this.props.showProfilePicture ?
                        <div id='profile-picture-icon'>
                            <IconButton
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={open ? 'menu-list-grow' : undefined}
                                aria-haspopup='true'
                                onClick={this.handleToggle}
                            >
                                <Avatar id='profile-picture-avatar' alt='Profile picture' src={this.props.profilePictureUrl} />
                            </IconButton>
                            <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        id='menu-list-grow'
                                        style={{transferOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList id='menu-list'>
                                                    {this.props.showMyAccountMenu ?
                                                        <div>
                                                            <MenuItem onClick={this.myAccountHandler}>My Account</MenuItem>
                                                            <Divider />
                                                        </div>
                                                        : ''
                                                    }
                                                    <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        : ''
                    }

                    {/* search box */}
                    {this.props.showSearchBox ?
                        <div className='search-box'>
                            <SearchIcon id='search-box-icon' />
                            <Input id='search-box-input' type='text' placeholder='Search...' disableUnderline={true} onChange={this.props.searchHandler} />
                        </div>
                        : ''
                    }

                </header>
            </div>
        )
    }
}

export default Header;
