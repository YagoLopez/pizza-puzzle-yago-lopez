import React from 'react';
import { withAuthorization } from '../../session';
import LikeButton from '../../shared/LikeButton'
import LikesCounter from '../../shared/LikesCounter';
import Paper from '@material-ui/core/Paper';

const HomePage = () => (
    <div className="page">
        <h1 className="responsive">Home Page</h1>
        <Paper elevation={5} className="responsive">
            <LikesCounter />
        </Paper>
        <LikeButton />
    </div>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(HomePage);
