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

export function createFavorite(questionData) {
    const token = localStorage.getItem('token');

    try {
        return request.post(`${URL}/api/favorites`)
        .send(questionData)
        .set('Authorization', token)
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchFavorites() {
    const token = localStorage.getItem('token');

    try {
        return request
            .get(`${URL}/api/favorites`)
            .set('Authorization', token)
    } catch(e) {
        return { error: e.message }
    }
}

export function deleteFavorite(id) {
    const token = localStorage.getItem('token');

    try{
        return request.delete(`${URL}/api/favorites/${id}`)
        .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}

