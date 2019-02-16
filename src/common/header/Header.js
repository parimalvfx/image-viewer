import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <header className='app-header'>
                    <span className='app-logo'>Image Viewer</span>
                </header>
            </div>
        )
    }
}

export default Header;
