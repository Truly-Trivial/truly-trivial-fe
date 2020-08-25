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