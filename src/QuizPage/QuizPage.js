/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { fetchQuestion, randomizeAnswers, createFavorite } from '../quiz-api.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './QuizPage.css';
import '../App.css';

export default class QuizPage extends Component {

    state = {
        currentQuestion: {},
        money: 0,
        questionCount: 0,
        randomizedAnswers: [],
        guess: '',
        bet: 1000,
        endGame: true,
        hasPlayed: false,
        lastAnswerCorrect: true,
        lastAnswer: '',
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/')
        }
    }

    onBetChange = async (e) => {
        // the await is only necessary if you do stuff in the function after setState that depends on the state
        this.setState({
            bet: e.target.value,
        })
    }

    onValueChange = async (e) => {
        console.log(this.state);
        console.log(e.target.value);
        // the await is only necessary if you do stuff in the function after setState that depends on the state
        this.setState({
          guess: this.state.randomizedAnswers[e.target.value]
        });

      }


    handleQuizStart = async (e) => {
        e.preventDefault();

        try {
            const questionData = await fetchQuestion(this.props.token)
            this.setState({ 
                currentQuestion: questionData.body.results[0], 
                questionCount: 1,
                endGame: false, 
            });

            this.handleRandomizer();

        } catch {
            console.log(e.message)
        }
    }

    handleRandomizer = async (e) => {
        try {
            // seems like you're just making a copy of this.state.currentQuestion.incorrect_answers here . . .
            const unrandomizedAnswers = this.state.currentQuestion.incorrect_answers.slice();

            unrandomizedAnswers.push(this.state.currentQuestion.correct_answer)
            await randomizeAnswers(unrandomizedAnswers);

            this.setState({ randomizedAnswers: unrandomizedAnswers })
        } catch(e) {
            console.log(e.message);
        }  
    }

    // This is a big, complex function! might have made sense to try and abstract this out into a few methods, maybe even a few functions in another file?
    handleAnswer = async (e) => {
        e.preventDefault();
        try {
            if (this.state.questionCount === 10) {
                if (this.state.guess === this.state.currentQuestion.correct_answer) {
                    await this.setState({
                        money: Number(this.state.money) + Number(this.state.bet),
                        lastAnswerCorrect: true,
                    });
                    await this.setState({
                        endGame: true,
                        questionCount: 0,
                        hasPlayed: true,
                    }) 
                } else {
                    await this.setState({
                        money: Number(this.state.money) - Number(this.state.bet),
                        lastAnswerCorrect: false,
                        lastAnswer: this.state.currentQuestion.correct_answer,
                        endGame: true,
                        questionCount: 0,
                        hasPlayed: true,
                    });
                }
            } else {
                if (this.state.guess === this.state.currentQuestion.correct_answer) {
                    await this.setState({
                        money: Number(this.state.money) + Number(this.state.bet),
                        lastAnswerCorrect: true,
                    });
                } else {
                    await this.setState({
                        money: Number(this.state.money) - Number(this.state.bet),
                        lastAnswerCorrect: false,
                        lastAnswer: this.state.currentQuestion.correct_answer,
                    });
                }
    
                const questionData = await fetchQuestion(this.props.token)
                this.setState({ 
                    currentQuestion: questionData.body.results[0], 
                    // nice!
                    questionCount: this.state.questionCount + 1,
                    randomizedAnswers: [],
                })

                this.handleRandomizer();
            }
        } catch(e) {
            console.log(e.message);
        }
    }

    handleFavorite = async () => {
        try {
            const question = this.state.currentQuestion
            await createFavorite({
                category: question.category,
                type: question.type,
                difficulty: question.difficulty,
                question: question.question,
                correct_answer: question.correct_answer,
                incorrect_answers: question.incorrect_answers
            })
            // i'd rather this be handled with some kind of react code instead of a browser alert
            alert('Added to Favorites')
        } catch(e) {
            console.log(e.message);
        }
    }

    handleFavoriteRedirect = () => {
        this.props.history.push('/favorites');
    }

    // This is one way to abstract this work out--the render method was getting pretty big. Probably the right way to do this would be to make another component in another file.
    renderQuiz = () => {
        const html = this.state.currentQuestion.question

        return this.state.endGame 
            ? 
            <div className="start-quiz">
                <form onSubmit={this.handleQuizStart}>
                    <label className='margin-bottom'>
                        <button className='start-quiz-button'>{ this.state.hasPlayed ? 'Play Again' : 'Start Quiz!' }</button>
                        <button className="view-favorites-button" onClick={this.handleFavoriteRedirect}>View Favorites</button>
                    </label>
                </form>
            </div> 
            :
            <div className="max-width margin-bottom glitter-green rounded-border">
                <div className="question-display">
                    
                    <form className="question-form" onSubmit={this.handleAnswer}>
                        <p className="question-text">
                            {ReactHtmlParser(html)}
                        </p>
                            {
                                this.state.randomizedAnswers.map((answer, i) => {    
                                return <label key={'answer' + i}>
                                        {ReactHtmlParser(answer)}
                                    <input onChange={this.onValueChange} type="radio" name="multiple-choice" value={i} key={'answer' + i} />
                                    </label>
                                })
                            }
                        <br />Bet $ <input min="1000" max="10000" className="bet" onChange={this.onBetChange} type="number" value={this.state.bet}></input> 
                        <br/>
                        <button className="submit-answer-button">Submit Answer</button>
                    </form>
                    <button className="favorite-button" onClick={this.handleFavorite}>Add to Favorites</button>
                </div>
            </div>
    }

    render() {
        return (
            <div className="quiz-div">
                <div className="question-sign">
                    Trivial Trivia
                </div>
                <div className="money-display">
                    { 
                    this.state.questionCount > 1 &&
                    <p className="money-text">
                        { 
                        this.state.lastAnswerCorrect 
                            ? 'Correct!'
                            : `Too bad! The correct answer was ${this.state.lastAnswer}`
                        }
                    </p>
                    }
                    <p className='dollar-display'>You have ${this.state.money}</p>
                </div>
                { this.renderQuiz() }
            </div>
        )
    }
}
