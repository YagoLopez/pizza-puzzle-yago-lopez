import React  from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { SIGNUP_INITIAL_STATE } from '../../../constants/initialState';
import { Error } from '../../shared/Error';
import { LoaderIndicator } from '../../shared/LoaderIndicator';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../../constants/routes';

class SignUpFormBase extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = SIGNUP_INITIAL_STATE;
        this.firebaseSubscription = null;
    }

    onSubmit = event => {
        const { username, email, passwordOne, likesCounter } = this.state;
        this.setState({loading: true});
        this.firebaseSubscription = this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne) // Create user in Firebase
            .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({ username, email, likesCounter }); // Save user data in Firebase
            })
            .then(() => {
                this.setState(SIGNUP_INITIAL_STATE);
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        event.preventDefault();
    };

    onChange = value => event => {
        this.setState({ [value]: event.target.value });
    };

    /**
     * Simple form validation
     * @param passOne
     * @param passTwo
     * @param email
     * @param username
     * @returns {boolean}
     */
    static isInvalidForm = (passOne, passTwo, email, username) => {
        return passOne !== passTwo || passOne === '' || email === '' || username === '';
    };

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { username, email, passwordOne, passwordTwo, error, loading } = this.state;
        const isInvalidForm = SignUpFormBase.isInvalidForm(passwordOne, passwordTwo, email, username);

        return (
            <div className="responsive">
                <Paper elevation={5} className="paper">
                    <form onSubmit={this.onSubmit} noValidate autoComplete="off" className="form">
                        <div>
                            <TextField
                                id="Name"
                                label="Name"
                                value={username}
                                onChange={this.onChange('username')}
                                margin="normal"
                                className="text-field"
                            />
                        </div>
                        <div>
                            <TextField
                                id="Email"
                                label="Email"
                                value={email}
                                onChange={this.onChange('email')}
                                margin="normal"
                                className="text-field"
                            />
                        </div>
                        <div>
                            <TextField
                                id="passwordOne"
                                label="Password One"
                                value={passwordOne}
                                onChange={this.onChange('passwordOne')}
                                margin="normal"
                                className="text-field"
                            />
                        </div>
                        <div>
                            <TextField
                                id="passwordTwo"
                                label="Password Two"
                                value={passwordTwo}
                                onChange={this.onChange('passwordTwo')}
                                margin="normal"
                                className="text-field"
                            />
                        </div>

                        { loading && <LoaderIndicator/> }

                        { error && <Error message={error.message}/>}

                        <Button disabled={isInvalidForm} type="submit" variant="contained"
                                color="primary" className='button'>
                            <Icon className="ico-button">create</Icon> Sign Up
                        </Button>

                    </form>
                </Paper>
                ← <Link to={'/'}>Landing Page</Link>
            </div>
        )
    }
}

export const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
