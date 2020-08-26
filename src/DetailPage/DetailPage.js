import React, { Component } from 'react'
import { fetchFavorite, deleteFavorite, fetchFavorites } from '../quiz-api.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './DetailPage.css';

export default class DetailPage extends Component {
    state = {
        question: {},
    }

    componentDidMount = async () => {

        try {
            if (!this.props.token) {
                this.props.history.push('/');
            } else {
                const data = await fetchFavorite(this.props.match.params.id)
                const fetchedQuestion = data.body[0]

                this.setState({
                    question: fetchedQuestion
                })
            }
        } catch(e) {
            console.log(e.message);
        }
    }

    handleDelete = async () => {
        try {
            await deleteFavorite(this.props.match.params.id)
            this.props.history.push('/favorites')
        } catch(e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div>

                <button onClick={this.handleDelete}></button>
            </div>
        )
    }
}
