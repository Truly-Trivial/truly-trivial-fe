/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { fetchQuestion, randomizeAnswers, removeEncoding } from '../quiz-api.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class QuizPage extends Component {

    state = {
        currentQuestion: {},
        money: 0,
        questionCount: 0,
        randomizedAnswers: [],
        guess: '',
        bet: 0,
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/')
        }
    }

    onBetChange = async (e) => {
        await this.setState({
            bet: e.target.value,
        })
    }

    onValueChange = async (e) => {
        console.log(this.state);
        console.log(e.target.value);

        await this.setState({
          guess: this.state.randomizedAnswers[e.target.value]
        });

        console.log(this.state);
        console.log(this.state.guess);
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

    handleAnswer = async (e) => {
        e.preventDefault();
        try {
            if (this.state.guess === this.state.currentQuestion.correct_answer) {
                await this.setState({
                    money: Number(this.state.money) + Number(this.state.bet)
                });
            } else {
                await this.setState({
                    money: Number(this.state.money) - Number(this.state.bet)
                });
            }
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
                <form className="question-display" onSubmit={this.handleAnswer}>
                    <p>
                        {ReactHtmlParser(html)}
                    </p>
                        {
                            this.state.randomizedAnswers.map((answer, i) => {    
                            return <label>
                                    {ReactHtmlParser(answer)}
                                <input onChange={this.onValueChange} type="radio" name="multiple-choice" value={i} key={'answer' + i} />
                                </label>
                            })
                        }
                    <input className="bet" onChange={this.onBetChange} type="number"></input> 
                    <button>Submit Answer</button>
                    <button>Favorite Button</button>
                </form>
                <div className="quiz-end">
                    <p>You have ${this.state.money}</p>
                    <button>Take a New Quiz</button>
                    <button>View Your Favorite Questions</button>
                </div>

            </div>
        )
    }
}
