import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDNnUxJamkhNzNbXul9f6NQ49Pxdi1xPu4",
    authDomain: "pizza-puzzle-yago-lopez.firebaseapp.com",
    databaseURL: "https://pizza-puzzle-yago-lopez.firebaseio.com",
    projectId: "pizza-puzzle-yago-lopez",
    storageBucket: "pizza-puzzle-yago-lopez.appspot.com",
    messagingSenderId: "193056455431"
};

/**
 * Firebase Class
 *
 * Creates the firebase connection
 * Exposes AUTHENTICATION methods
 * Exposes some CRUD methods for User entity and Likes counter
 */
export class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Firebase auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Firebase user API ***

    user = uid => this.db.ref(`users/${uid}`);

    getCurrentUserId = () => this.auth.currentUser.uid;

    users = () => this.db.ref('users');

    static incrementLikesCounter(dbSnapshot, user) {
        dbSnapshot.ref.set({ ...user, likesCounter: user.likesCounter + 1 })

    }
}
