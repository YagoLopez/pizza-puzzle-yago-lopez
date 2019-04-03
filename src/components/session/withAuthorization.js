import React from 'react';
import { AuthUserContext } from './context';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

/**
 * Authorization is a cross-cutting concern that affects different unrelated components
 * This feature can be implemented in functional programming using the HOC (High Order Component) Pattern.
 *
 * The authorization logic happens in the componentDidMount() life cycle method using Firebase API
 * The authenticated user is either an authUser object or null.
 * Within this function, the passed condition() function is executed with the authUser.
 *
 * If the authorization fails, for instance because the authenticated user is null,.
 * the higher-order component redirects to the sign in page. I
 * If it doesn't fail, the higher-order component does nothing
 */
export const withAuthorization = condition => Component => {

    class WithAuthorization extends React.Component {

        componentDidMount() {
            this.firebaseAuthSubscription = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        console.warn('Unauthorized user. Redirecting to SignIn Page');
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            )
        }

        componentWillUnmount() {
            this.firebaseAuthSubscription();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    { authUser => condition(authUser) ? <Component {...this.props} /> : null }
                </AuthUserContext.Consumer>
            )
        }
    }
    return compose(withRouter, withFirebase)(WithAuthorization);
};

