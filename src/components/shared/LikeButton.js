import React  from 'react';
import { Firebase, withFirebase } from '../firebase';
import { compose } from 'recompose';
import Lottie from 'react-lottie';
import animationData from '../../animations/lottie-like.json';

class LikeButton extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {isStopped: true, isPaused: true};
        this.lottie = null;
    }

    incrementLikesCounter = () => {
        let user;
        const userId = this.props.firebase.getCurrentUserId();
        const userRef = this.props.firebase.user(userId);
        userRef.once('value', (snapshot) => {
            user = snapshot.val();
            Firebase.incrementLikesCounter(snapshot, user);
        });
    };

    playPauseAnimation = () => {
        this.incrementLikesCounter();
        this.setState({isStopped: !this.state.isStopped});
    };

    render() {

        const animationOptions = {
            animationData: animationData,
            autoplay: false,
            loop: false,
            rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}
        };

        const eventListeners=[
            {
                eventName: 'complete',
                callback: () => this.setState({isStopped: true})
            }
        ];

        return (
            <div className="margin-likes-btn">
                <button className="likes-counter-btn" onClick={this.playPauseAnimation}>
                    <Lottie options={animationOptions}
                            speed={4}
                            height={100}
                            width={100}
                            isStopped={this.state.isStopped}
                            eventListeners={eventListeners} />
                </button>
                <div className="btn-footer">Click the button if you like pizza</div>
            </div>
        )
    }
}

export default compose(withFirebase)(LikeButton);
