import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <div>
                    <Link to='/quiz'>QUIZ PAGE</Link>
                    <Link to='/favorites'>FAVORITES PAGE</Link>
                    <Link to='/about'>ABOUT US PAGE</Link>
            </div>
        )
    }
}
