import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTE from '../../constants/routes';
import Button from '@material-ui/core/Button';

class SignOut extends Component {

    onClickBtn = () => {
        this.props.firebase.doSignOut();
        this.props.history.push(ROUTE.LANDING);
    };

    render() {
        return <Button color="inherit" onClick={this.onClickBtn}>Sign Out</Button>
    }
}

export const SignOutButton = compose(withRouter, withFirebase)(SignOut);
