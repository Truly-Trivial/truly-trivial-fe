import React, { Component } from 'react'
import { signUp, signIn } from '../quiz-api.js';

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
        return (
            <div className="auth">
                <form onSubmit={this.handleSignIn}>
                    Sign In?
                    <label>
                        Email:
                        <input onChange={e => this.setState({ signInEmail: e.target.value })} value={this.state.signInEmail}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" onChange={e => this.setState({ signInPassword: e.target.value })} value={this.state.signInPassword}/>
                    </label>
                    <button className="authButton">Submit</button>
                </form>
                <form onSubmit={this.handleSignUp}>
                    Sign Up?
                    <label>
                        Email:
                        <input onChange={e => this.setState({ signupEmail: e.target.value })} value={this.state.signupEmail}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" onChange={e => this.setState({ signupPassword: e.target.value })} value={this.state.signupPassword}/>
                    </label>
                    <button className="authButton">Submit</button>
                </form>
            </div>
        )
    }
}