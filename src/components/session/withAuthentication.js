import React from 'react';
import { AuthUserContext } from '../session';
import { withFirebase } from '../firebase';

export const withAuthentication = Component => {

    class WithAuthentication extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }

        componentDidMount() {
            this.firebaseAuthSubscription = this.props.firebase.auth.onAuthStateChanged(
                authUser =>
                    authUser
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null })
            )
        }

        componentWillUnmount() {
            this.firebaseAuthSubscription();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication)
};
