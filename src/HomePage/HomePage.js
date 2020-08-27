import React, { Component } from 'react'
import { signUp, signIn } from '../quiz-api.js';
import './HomePage.css';
import '../App.css';

export default class AuthPage extends Component {
    state = {
        signInEmail: '',
        signInPassword: '',
        signupEmail: '',
        signupPassword: ''
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const user = await signUp({
                email: this.state.signupEmail,
                password: this.state.signupPassword
            });
    
            this.props.handleToken(user.body.token);
            this.props.history.push('/quiz');
        } catch(e) {
            console.log(e.response.body.error);
            alert('Email is Already Taken');
        }
    }


    handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const user = await signIn({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            });
    
            this.props.handleToken(user.body.token);
            this.props.history.push('/quiz');
        } catch(e) {
            console.log(e.response.body.error);
            alert('Incorrect Login Information');
        }  
    }

    componentDidCatch(err, errinfo) {
        console.log('=============================\n')
        console.log('|| ', err, errinfo)
        console.log('\n=============================')
    }

    render() {
        const confettiArray = [1,2,3,4,5,6,7,8,9,10];

        return (
            <div className='home-page-container'>
                <div className="auth">
                    <div className='confetti-container'>
                        {confettiArray.map((confettiItem, i) => {
                            return <div key={'conf' + i} className='confetti'><span className='dollar'>$</span><span className='dollar'>$</span></div>
                        })}
                    </div>
                    <div className="logo-holder"></div>
                    <form className="sign-in" onSubmit={this.handleSignIn}>
                        <span>Sign In?</span>
                        <label>
                            Email:
                            <input className='email-margin' onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail}/>
                        </label>
                        <label>
                            Password:
                            <input type="password" onChange={e => this.setState({ signInPassword: e.target.value })} value={this.state.signInPassword}/>
                        </label>
                        <button className="authButton">Submit</button>
                    </form>
                    <form className="sign-up" onSubmit={this.handleSignUp}>
                        <span>Sign Up?</span>
                        <label>
                            Email:
                            <input className='email-margin' onChange={e => this.setState({ signupEmail: e.target.value })} value={this.state.signupEmail}/>
                        </label>
                        <label>
                            Password:
                            <input type="password" onChange={e => this.setState({ signupPassword: e.target.value })} value={this.state.signupPassword}/>
                        </label>
                        <button className="authButton">Submit</button>
                        <label>TERMS AND CONDITIONS APPLY (KIND OF)
                        <div className="scroll-box">

                        The owners and developers of Truly Trivial are not responsible for any distress, aggravation, frustration up to and including (but not limited to) damage to self, personal or public property, or the declaration that the user will never play trivial ever again after this game. Truly Trivial was created by a group of really, really smart people so don’t feel bad if you get a bunch of these questions wrong. Honestly, you probably will. 

                        All money bet or wagered is the users own. By clicking Accept, the user acknowledges that Truly Trivial owns 2/3 or all user winnings. Users are responsible for paying winnings directly to Truly Trivial by sending the equivalent amount in gold bullion, tied to the leg of a snowy owl to:
                            1725 Slough Avenue
                            Scranton, Pa 18510
                        This payment is due within 1 fortnight of completion of Truly Trivial. Payment by other species of owls (barn, great horned, etc) or other animals or birds (lizards, cats, emus, etc) will automatically void payment. Truly Trivial reserves the right to send users directly to collections for delinquent or absent payments.

                        In the event of a negative balance, Truly Trivial will expect payment within 20 days of game completion. This payment, due to the above address, should be accompanied by three lobsters and a box of cannoli from Mike’s Pastry in Boston, MA (honestly, you owe us money, you can go ahead and look up the address). Should payment in any part be delinquent or incomplete, Truly Trivial reserves the right to charge interest beginning with but not limited to 45% of delinquent payment. Once 20 days has elapsed, Truly Trivial will forward collection of delinquent payments to its subsidiary, “Larry’s Cement and Contracting, LLC”. Truly Trivial, it’s owners and developers are not responsible for the actions, methods, language or impression given by Larry’s Cement and Contracting. 

                        Users may contact Truly Trivial to set up a payment plan by utilizing our 20 step “Easy Breezy” enrollment process outlined below:
                        1)Users should specify that they need a payment plan prior to beginning a game by:
                            a)stating their intent via handwritten scroll (acceptable paper includes parchment but excludes birch bark. Full list of available writing surfaces can be found in Appendix A.3.5)
                            b)scroll must be delivered directly to head game maker, Tom Servo via pneumatic tube (full list of pneumatic tube drop sites no longer exists but partial list may be found drawn on the underside of a table at the Double R Diner.
                        2)User must begin game logged in as a member of Team 7. If user logs in under a different name, payment plan is null and void.
                        3)Additional users may enroll under same payment plan by logging in as user “Ren Hoek”.
                        4)Once game completes any users enrolled in payment plan, regardless of balance must take off their shoes.
                        5)Hop on one foot.
                        6)And send a video directly to Truly Trivial, Department of Video Responses and Litigation (address can be found in Appendix B.12.c.23).
                        7)Following submission of video users should memorize the following:

                        “I will tell you why. So shall my anticipation prevent your discovery, 	and your secrecy to the king and queen moult no feather. I have of late—but wherefore I know not—lost all my mirth, forgone all custom of exercises, and indeed it goes so heavily with my disposition that this goodly frame, the earth, seems to me a sterile promontory; this most excellent canopy, the air—look you, this brave o'erhanging firmament, this majestical roof fretted with golden fire—why, it appears no other thing to me than a foul and pestilent congregation of vapors. What a piece of work is a man! How noble in reason, how infinite in faculty! In form and moving how express and admirable! In action how like an angel, in apprehension how like a god! The beauty of the world. The paragon of animals. And yet, to me, what is this quintessence of dust?”

                        8)Then recite it out loud to an elderly badger named Moe.
                        9)Moe will review users performance and submit a rating up to five stars directly to Truly Trivial.
                        10)Truly Trivial will look through reviews. Any user giving a performance of less than 3.5 stars will have their payment plan voided and sent directly to collections.
                        11)Steps 12-20 will be mailed to user via USPS media mail and must be completed within ten calendar days of the date the steps were mailed by Truly Trivial. International users will be granted 2 additional calendar days to complete additional steps. Any users who do not complete all steps will have their payment plans voided and be sent directly to collections.

                        Honestly if you read this far, good job, we are impressed.
                        </div>
                        </label>
                    </form>
                </div>
            </div>
        )
    }
}