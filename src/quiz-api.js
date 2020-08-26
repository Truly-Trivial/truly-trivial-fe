import request from 'superagent';

const URL = process.env.REACT_APP_API_URL;

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        return { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        return e 
    }
}

export function fetchQuestion() {
    const token = localStorage.getItem('token');

    try {
        return request.get(`${URL}/api/questions?searchQuery=amount=1`)
        .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

export function randomizeAnswers(answersToRandomize) {

    for (var i = answersToRandomize.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = answersToRandomize[i];
        answersToRandomize[i] = answersToRandomize[j];
        answersToRandomize[j] = temp;
    }
}


