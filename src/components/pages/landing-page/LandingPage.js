import React  from 'react';
import { withFirebase } from '../../firebase';
import { LoaderIndicator } from '../../shared/LoaderIndicator';
import { LikesBarChart } from './BarChart';
import Paper from '@material-ui/core/Paper';

export class LandingPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            width: 500,
            users: []
        };
    }

    static sortUsersByLikesNumber = (usersList) => {
        function compare(userA, userB) {
            if (userA.likesCounter < userB.likesCounter)
                return -1;
            if (userA.likesCounter > userB.likesCounter)
                return 1;
            return 0;
        }
        return usersList.sort(compare);
    };

    static getFirst10Users = (usersList) => {
        return usersList.slice(0, 10);
    };

    static getChartWithRatio = () => {
        if (window.innerWidth > 710) {
            return 1.4
        } else {
            return 1.1;
        }
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        this.props.firebase.users().on('value', snapshot => {
            let sortedUsersArray;
            const usersList = snapshot.val();
            if (usersList) {
                // Maps usersList to an array
                let usersArray = Object.keys(usersList)
                    .map(key => ({
                        ...usersList[key],
                        uid: key,
                    }));
                sortedUsersArray = LandingPage.sortUsersByLikesNumber(usersArray);
                sortedUsersArray = LandingPage.getFirst10Users(usersArray);

            } else {
                sortedUsersArray = [];
            }
            this.setState({ users: sortedUsersArray, isLoading: false });
        });

        window.onresize = () => {
            this.setState({width: window.innerWidth/LandingPage.getChartWithRatio()});
        };
        this.setState({width: window.innerWidth/LandingPage.getChartWithRatio()});
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    onBarClick(element, id){
        window.alert(`
            👤 USER DATA:\n
            • Id: ${element.uid}
            • Name: ${element.username}
            • Email: ${element.email}
            • Likes Counter: ${element.likesCounter}
        `);
    }

    isFetchUsersComplete() {
        return this.state.users.length > 0;
    }

    render() {
        const { users, isLoading } = this.state;
        return (
            <div className='page'>
                <h1 className='responsive'>Landing Page</h1>
                <div className='loader responsive'>
                    { isLoading && <LoaderIndicator /> }
                </div>
                <Paper elevation={5} className='responsive'>
                    {
                        this.isFetchUsersComplete()
                            && <LikesBarChart
                                width={this.state.width}
                                height={300}
                                data={this.state.users}
                                onBarClick={this.onBarClick}/>
                    }
                </Paper>
                <Paper elevation={5} className='paper responsive'>
                    <div className='chart-title'>Last 10 user's votes by ascending order</div>
                    <ul className='users-list-votes'>
                        {
                            users.map(user => (
                                <li key={user.uid} className='pad-bottom'>
                                    <div><strong>Username:</strong> {user.username}</div>
                                    <div><strong>E-Mail:</strong> {user.email}</div>
                                    <div><strong>likesCounter:</strong> {user.likesCounter}</div>
                                </li>
                            ))
                        }
                    </ul>
                </Paper>
            </div>
        )
    }

}

export default withFirebase(LandingPage);
