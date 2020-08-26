import React, { Component } from 'react';
import bob from './bob_barker_sticker_face_2.png';
import './FavoritesPage.css';

export default class FavoritesPage extends Component {
    render() {
        return (
            <>
            <div>
                *****FAVORITES PAGE*****
            </div>
            <div>
            <img className="barker" src={bob} alt="bob barker and his smiling face" />
        </div>
        </>
        )
    }
}
