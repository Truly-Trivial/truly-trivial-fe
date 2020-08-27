/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bob from './bob_barker_sticker_face_2.png';
import './FavoritesPage.css';
import Header  from '../Header.js';
import { fetchFavorites } from '../quiz-api';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class FavoritesPage extends Component {

    state = {
        favorites: []
    }

    componentDidMount = async () => {
        try {
            if (!this.props.token) {
                this.props.history.push('/');
            } else {
                const favoritesData = await fetchFavorites(this.props.token)
                console.log(favoritesData);
    
                this.setState({
                    favorites: favoritesData.body
                })
            }
        } catch(e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div  className="fav-page">
            <Header></Header>
            <div>
                {
                    this.state.favorites.length > 0 &&
                    this.state.favorites.map((favorite) => {
                        return <div>
                            <p className="question">{ReactHtmlParser(favorite.question)}</p>
                            <Link to={`/detail/${favorite.id}`}>View Details</Link>
                            </div>
                    })
                }
            </div>
            <div>
            <img className="barker" src={bob} alt="bob barker and his smiling face" />
        </div>
        </div>
        )
    }
}
