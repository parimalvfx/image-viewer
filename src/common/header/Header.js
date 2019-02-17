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

class Header extends Component {

    constructor() {
        super();
        this.state = {
            accessToken: sessionStorage.getItem('access-token'),
            profilePictureUrl: '',
            open: false
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

    render() {

        const {open} = this.state;

        return (
            <div>
                <header className='app-header'>

                    {/* app logo */}
                    <span className='app-logo'>Image Viewer</span>

                    {/* user profile icon */}
                    {this.props.showProfilePicture === 'true' ?
                        <div id='profile-picture-icon'>
                            <IconButton
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={open ? 'menu-list-grow' : undefined}
                                aria-haspopup='true'
                                onClick={this.handleToggle}
                            >
                                <Avatar id='profile-picture-avatar' alt='Profile picture' src='https://scontent.cdninstagram.com/vp/75dc65cfd2fa6001f7c1171f2a68c8ae/5CF96F17/t51.2885-19/s150x150/41947221_725500971134637_2241518422187835392_n.jpg?_nc_ht=scontent.cdninstagram.com' />
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
                                                    {this.props.showMyAccountMenu === 'true' ?
                                                        <div>
                                                            <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                                                            <Divider />
                                                        </div>
                                                        : ''
                                                    }
                                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
                    {this.props.showSearchBox === 'true' ?
                        <div className='search-box'>
                            <SearchIcon id='search-box-icon' />
                            <Input id='search-box-input' type='text' placeholder='Search...' disableUnderline={true} />
                        </div>
                        : ''
                    }

                </header>
            </div>
        )
    }
}

export default Header;
