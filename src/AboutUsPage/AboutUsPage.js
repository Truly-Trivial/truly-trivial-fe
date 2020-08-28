import React, { Component } from 'react';
import './AboutUsPage.css';
import Header from '../Header.js'

export default class AboutUsPage extends Component {

    render() {
        const confettiArray = [1,2,3,4,5,6,7,8,9,10];

        return (
            <>
                <Header></Header>
            <div className='about-us-info'>
                <h1 className='about-us-title glow-yellow'>Meet Your Hosts!</h1>
                <div className='confetti-container'>
                    {confettiArray.map((confettiItem, i) => {
                        return <div key={'conf' + i} className='confetti'><span className='dollar'>$</span><span className='dollar'>$</span></div>
                    })}
                </div>
                <div className='about-us-page'>
                    <div className='about-area glitter-orange'>
                        <div className='about-area2'>
                            <div className='about-info'>
                                <h3>Michelle Stermitz</h3>
                                <div className='michelle-image about-image'></div>
                                <p className='about-paragraph'>Michelle, 29, is a software developer based in Portland. She’s planning to use her winnings to escape the suburbs and move to Paris to start a one-woman vaudeville act. Combining an extensive knowledge of Tom Selleck and IQ of 20,000, she’s here to win and the other contestants should look out.</p>
                            </div>
                            <div className='about-links'>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/michellestermitz/">
                                    <div className='li-icon'></div>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://google.com/">
                                    <div className='tw-icon'></div>
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className='about-area glitter-orange'>
                        <div className='about-area2'>
                            <div className='about-info'>
                                <h3>Sarah Rector</h3>
                                <div className='sarah-image about-image'></div>
                                <p className='about-paragraph'>Sarah is from Monterey, California and is currently a software developer. She enjoys playing roller derby, watching movies and telling dad jokes that she actually believes are funny. She has the same deep love for Jeopardy as her grandmother and misses the original Press Your Luck.   Sarah is going to use her winnings to get at least three corgis.</p>
                            </div>
                            <div className='about-links'>
                                <a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/in/sarah-rector">
                                    <div className='li-icon'></div>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Rector206">
                                    <div className='tw-icon'></div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='about-area glitter-orange'>
                        <div className='about-area2'>
                            <div className='about-info'>
                                <h3>Thomas Stussi</h3>
                                <div className='thomas-image about-image'></div>
                                <p className='about-paragraph'>This is Thomas. Thomas is a software developer from Portland, a fan of fantasy with a penchant for pedantics. He plans to use his winnings to turn his car into and animatronic dragon.</p>
                            </div>
                            <div className='about-links'>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/thomas-stussi-864530179/">
                                    <div className='li-icon'></div>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/thomasStussi?s=09">
                                    <div className='tw-icon'></div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='about-area glitter-orange'>
                        <div className='about-area2'>
                            <div className='about-info'>
                                <h3>Patrick Wilson</h3>
                                <div className='patrick-image about-image'></div>
                                <p className='about-paragraph'>Patrick, is a Software Engineer from Portland, Oregon who loves solving puzzles, building siege engines and creative problem solving. He is excited about software development and is looking forward to using his winnings for vacationing in the tropics.</p>
                            </div>
                            <div className='about-links'>
                                <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/patrick-wilson-46684958/">
                                    <div className='li-icon'></div>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Patrick55487480/">
                                    <div className='tw-icon'></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
