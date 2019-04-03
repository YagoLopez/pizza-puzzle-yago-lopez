import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { Error } from '../../shared/Error';
import { LoaderIndicator } from '../../shared/LoaderIndicator';
import { SIGNIN_INITIAL_STATE } from '../../../constants/initialState';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as ROUTES from '../../../constants/routes';

class SignInFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = SIGNIN_INITIAL_STATE;
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.setState({loading: true});
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...SIGNIN_INITIAL_STATE, loading: false});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        event.preventDefault();
    };

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    onChange = value => event => {
        this.setState({ [value]: event.target.value });
    };

    render() {
        const { email, password, error, loading } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <Paper elevation={5} className="paper responsive">
                <form onSubmit={this.onSubmit} method="post" noValidate autoComplete="off" className="form">

                    <div>
                        <TextField
                            id="standard-name"
                            label="Email"
                            value={email}
                            onChange={this.onChange('email')}
                            margin="normal"
                            className="text-field"
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-name"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={this.onChange('password')}
                            margin="normal"
                            className="text-field"
                        />
                    </div>

                    { loading && <LoaderIndicator message={'Signing in...'}/> }

                    { error && <Error message={error.message}/> }

                    <Button disabled={isInvalid} type="submit" variant="contained"
                            color="primary" className='button'>
                            <Icon className="ico-button">forward</Icon> Sign In
                    </Button>
                </form>
            </Paper>
        );
    }
}

export const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
