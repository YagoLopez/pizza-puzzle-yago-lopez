import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/shared/Header';
import LandingPage from './components/pages/landing-page/LandingPage';
import HomePage from './components/pages/home-page/HomePage';
import { SignUpPage } from './components/pages/signup-page/SignUpPage';
import { SignInPage } from './components/pages/signin-page/SignInPage';
import { withAuthentication } from './components/session';
import * as ROUTES from './constants/routes';
import './App.css';

/**
 * ============================
 * Pizza Puzzle - By Yago López
 * ============================
 *
 * The App component keeps track of the authenticated user using the "withAuthentication" high order component
 *
 * If the user is authenticated, it is stored in the local state and passed
 * down to all components that are interested in it.
 * Otherwise, pass the authenticated user is null.
 */
const App = () => (
  <Router>
    <Header />
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.HOME} component={HomePage} />
  </Router>
);

export default withAuthentication(App);
