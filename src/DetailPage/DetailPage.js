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

                // the await is usually only necessary if you're doing work after the setState in the same method
                this.setState({
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
        const incorrectAnswers = JSON.parse(this.state.question.incorrect_answers)
            .map((answer, i) => <div className="detail-sub" key={"answer"+i}>
                {answer}
            </div>
        );

        return (
            <>
                <Header></Header>
            <div className="detail-page">
                <div className="glitter-orange detail-glitter">
                <div className="detail-display-box">
                    <h3 className="glow-yellow">{ReactHtmlParser(this.state.question.question)}</h3>
                    <div className="detail-p">Correct Answer: 
                    <div className="detail-sub">{ReactHtmlParser(this.state.question.correct_answer)}</div>
                    </div>
                    <div className="detail-p">Incorrect Answers:
                        {
                        questionVar.incorrect_answers &&
                            incorrectAnswers
                        } 
                    </div>
                    <div className="detail-p">Category: 
                    <div className="detail-sub">{this.state.question.category}</div>
                    </div>
                    <div className="detail-p">Difficulty: 
                    <div className="detail-sub">{this.state.question.difficulty}</div>
                    </div>
                    <button onClick={this.handleDelete} className="detail-delete">Remove From Favorites</button>
                </div>
                </div>
            </div>
            </>
        )
    }
}
