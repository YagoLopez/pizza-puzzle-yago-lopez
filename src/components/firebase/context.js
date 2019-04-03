import React from 'react';

/**
 * The Firebase Context HOC (High Order Component) is used to provide a Firebase instance to the entire
 * application.
 *
 * Firebase is initialized only once in the application (singleton pattern) and exposes the
 * Firebase instance to every React component
 *
 * Every component can have access to the Firebase instance, being wrapped
 * inside the "withFirebase" HOC
 */
export const FirebaseContext = React.createContext(null);


/**
 * Firebase High Order Component
 * Provides firebase auth API to any wrapped component
 */
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase} /> }
    </FirebaseContext.Consumer>
);
