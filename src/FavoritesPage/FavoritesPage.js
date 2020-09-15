/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bob from './bob_barker_sticker_face_2.png';
import './FavoritesPage.css';
import '../App.css';
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
            <>
            <Header></Header>
            <div  className="fav-page">
                <h1 className="fav-questions glow-yellow">My Truly Trivial Trivia</h1>
                <img className="barker" src={bob} alt="bob barker and his smiling face" />
            <div className="fav-container glitter-green">
                {
                    this.state.favorites.length > 0 &&
                    this.state.favorites.map((favorite, i) => {
                        return <div className="fav-div" key={'favorite' + i}>
                            <p className="question">{ReactHtmlParser(favorite.question)}</p>
                            <Link to={`/detail/${favorite.id}`} className="detail-link">View Details</Link>
                            </div>
                    })
                }
            </div>
            <div>
        </div>
        </div>
        </>
        )
    }
}
