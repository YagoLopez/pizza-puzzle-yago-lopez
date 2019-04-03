import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton} from './SignOutButton';
import { AuthUserContext } from '../session';
import * as ROUTES from '../../constants/routes';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        paddingRight: '10px'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const HeaderAuthUser = (props) => (
    <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <Button variant="contained" color="primary" style={styles.grow}
                            component={Link} to={ROUTES.LANDING}>
                        <HomeIcon />
                    </Button>
                </IconButton>
                <SignOutButton />
                <Icon className="ico-button logged-in">account_box</Icon>[Logged in]
            </Toolbar>
        </AppBar>
    </div>
);

const HeaderNonAuthUser = () => (
    <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <Button variant="contained" color="primary" style={styles.grow}
                            component={Link} to={ROUTES.LANDING}>
                        <HomeIcon />
                    </Button>
                </IconButton>
                <Typography variant="h6" color="inherit">
                    <Button component={Link} to={ROUTES.SIGN_IN} style={styles.grow}>Sign In</Button>
                    <Button component={Link} to={ROUTES.SIGN_UP} style={styles.grow}>Sign Up</Button>
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
);

export class Header extends Component {
    render() {
        return(
            <AuthUserContext.Consumer>
                { authUser => authUser ? <HeaderAuthUser /> : <HeaderNonAuthUser /> }
            </AuthUserContext.Consumer>
        )
    }
}
