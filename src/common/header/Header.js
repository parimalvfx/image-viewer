import React, { Component } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

class Header extends Component {
    render() {
        return (
            <div>
                <header className='app-header'>

                    {/* app logo */}
                    <span className='app-logo'>Image Viewer</span>

                    {this.props.showProfilePicture === 'true' ?
                        <div id='profile-picture-icon'>
                            <IconButton>
                                <Avatar id='profile-picture-avatar' alt='Profile picture' src='https://scontent.cdninstagram.com/vp/75dc65cfd2fa6001f7c1171f2a68c8ae/5CF96F17/t51.2885-19/s150x150/41947221_725500971134637_2241518422187835392_n.jpg?_nc_ht=scontent.cdninstagram.com' />
                            </IconButton>
                        </div>
                        : ''
                    }

                    {/* search box */}
                    {this.props.showSearchBox === 'true' ?
                        <div className='search-box'>
                            <SearchIcon id='search-box-icon' />
                            <Input id='search-box-input' type='text' placeholder='Search...' disableUnderline='true' />
                        </div>
                        : ''
                    }

                </header>
            </div>
        )
    }
}

export default Header;
