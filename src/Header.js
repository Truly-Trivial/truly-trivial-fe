import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div className="page-header glitter-green">
                    <Link to='/quiz' className="header-link">PLAY TRULY TRIVIAL!</Link>
                    <Link to='/favorites' className="header-link">VIEW YOUR FAVORITES!</Link>
                    <Link to='/about' className="header-link">MEET YOUR HOSTS!</Link>
            </div>
        )
    }
}
