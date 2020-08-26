/* eslint-disable no-unused-vars */
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

                await this.setState({
                    question: fetchedQuestion,
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
        const questionVar = this.state.question

        return (
            
            <div>
                <h3>{ReactHtmlParser(this.state.question.question)}</h3>
                <p>Correct Answer: {ReactHtmlParser(this.state.question.correct_answer)}</p>
                <p>Incorrect Answers:
                    {
                    questionVar.incorrect_answers &&
                    JSON.parse(this.state.question.incorrect_answers).map((answer) => {
                        return <p>{answer}</p>
                    })
                    } 
                </p>
                <p>Category: {this.state.question.category}</p>
                <p>Difficulty: {this.state.question.difficulty}</p>

                <button onClick={this.handleDelete}>Remove From Favorites</button>
            </div>
        )
    }
}
