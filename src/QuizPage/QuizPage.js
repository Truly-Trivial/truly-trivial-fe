import React, { Component } from 'react';
import { fetchQuestion, randomizeAnswers } from '../quiz-api.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class QuizPage extends Component {

    state = {
        currentQuestion: {},
        money: 0,
        questionCount: 0,
        randomizedAnswers: [],
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/')
        }
    }

    handleQuizStart = async (e) => {
        e.preventDefault();

        try {
            const questionData = await fetchQuestion(this.props.token)
            this.setState({ 
                currentQuestion: questionData.body.results[0], 
                questionCount: 1, 
            })

            this.handleRandomizer();

        } catch {
            console.log(e.message)
        }
    }

    handleRandomizer = async (e) => {
        try {
            const unrandomizedAnswers = this.state.currentQuestion.incorrect_answers;
            unrandomizedAnswers.push(this.state.currentQuestion.correct_answer)
            await randomizeAnswers(unrandomizedAnswers);

            this.setState({ randomizedAnswers: unrandomizedAnswers })
        } catch(e) {
            console.log(e.message);
        }  
    }
    
    render() {

        const html = this.state.currentQuestion.question
        return (
            <div>
                <div className="start-quiz">
                    <form onSubmit={this.handleQuizStart}>
                        <label>
                            <button>Start Quiz!!!!</button>
                        </label>
                    </form>
                </div>
                <div className="question-display">
                    <p>
                        {ReactHtmlParser(html)}
                    </p>
                        {
                            this.state.randomizedAnswers.map((answer) => {
                            return <button type="radio" name="multiple-choice" value={answer} key={answer}>{answer}</button>
                            })
                        }
                    <input className="bet"></input> 
                    <button>Submit Answer</button>
                    <button>Favorite Button</button>
                </div>
                <div className="quiz-end">
                    <p>You have ${this.state.money}</p>
                    <button>Take a New Quiz</button>
                    <button>View Your Favorite Questions</button>
                </div>

            </div>
        )
    }
}
