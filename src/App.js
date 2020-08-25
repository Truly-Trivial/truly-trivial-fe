import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
import HomePage from './HomePage/HomePage.js';
import QuizPage from './QuizPage/QuizPage.js';
import FavoritesPage from './FavoritesPage/FavoritesPage.js';
import DetailPage from './DetailPage/DetailPage.js';
import AboutUsPage from './AboutUsPage/AboutUsPage.js';

export default class App extends Component {
  render() {
      return (
          <div>
              <Router>
                <main>
                  <div>
                    <Link to='/'>HOME PAGE</Link>
                    <Link to='/quiz'>QUIZ PAGE</Link>
                    <Link to='/favorites'>FAVORITES PAGE</Link>
                    <Link to='/about'>ABOUT US PAGE</Link>
                  </div>
                  <Switch>
                      <Route 
                          path="/" 
                          exact
                          render={(routerProps) => <HomePage {...routerProps} />} 
                      />
                      <Route 
                          path="/quiz" 
                          exact
                          render={(routerProps) => <QuizPage {...routerProps} />} 
                      />
                      <Route 
                        path="/favorites" 
                        exact
                        render={(routerProps) => <FavoritesPage {...routerProps} />} 
                      />
                      <Route 
                          path="/detail" 
                          exact
                          render={(routerProps) => <DetailPage {...routerProps} />} 
                      />
                      <Route 
                          path="/about" 
                          exact
                          render={(routerProps) => <AboutUsPage {...routerProps} />} 
                      />
                  </Switch>
                </main>
              </Router>
          </div>
      )
  }
}
