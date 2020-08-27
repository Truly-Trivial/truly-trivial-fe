/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { fetchFavorite, deleteFavorite, fetchFavorites } from '../quiz-api.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './DetailPage.css';
import '../App.css'
import Header from '../Header.js'

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
            console.log(this.state.question);
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
            <>
                <Header></Header>
            <div className="detail-page">
                <div className="glitter-orange detail-glitter">
                <div className="detail-display-box">
                    <h3 className="glow-yellow">{ReactHtmlParser(this.state.question.question)}</h3>
                    <p className="detail-p">Correct Answer: 
                    <div className="detail-sub">{ReactHtmlParser(this.state.question.correct_answer)}</div>
                    </p>
                    <p className="detail-p">Incorrect Answers:
                        {
                        questionVar.incorrect_answers &&
                        JSON.parse(this.state.question.incorrect_answers).map((answer) => {
                            return <div className="detail-sub">{answer}</div>
                        })
                        } 
                    </p>
                    <p className="detail-p">Category: 
                    <div className="detail-sub">{this.state.question.category}</div>
                    </p>
                    <p className="detail-p">Difficulty: 
                    <div className="detail-sub">{this.state.question.difficulty}</div>
                    </p>
                    <button onClick={this.handleDelete} className="detail-delete">Remove From Favorites</button>
                </div>
                </div>
            </div>
            </>
        )
    }
}
