import React, { Component } from 'react'
import './header.scss'
function Header(props) {
    return (
        <div className="header">
            <div className="header-left">
                <img className="back" src={require('../../assets/images/back.png')} />
            </div>
            <div className="header-content">
                title
            </div>
            <div className="header-right">

            </div>
        </div>
    )
}

export default Header;