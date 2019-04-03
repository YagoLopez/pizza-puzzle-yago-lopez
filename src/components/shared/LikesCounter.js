import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';

class LikesCounter extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {likesCounter: 'loading...', userId: null}
    }

    componentDidMount() {
        const userId = this.props.firebase.auth.currentUser.uid;
        const currentUserRef = this.props.firebase.user(userId);
        currentUserRef.on('value', snapshot => {
            const currentUser = snapshot.val();
            this.setState({
                likesCounter: currentUser.likesCounter,
                userId: currentUser.uid
            });
        })
    }

    /**
     * Unsubscribe from real-time user data to avoid memory leaks
     */
    componentWillUnmount() {
        this.props.firebase.user(this.state.userId).off();
    }

    render() {
        return (
            <div className='likes-counter'>{ this.state.likesCounter }</div>
        )
    }
}
export default compose(withFirebase)(LikesCounter);
