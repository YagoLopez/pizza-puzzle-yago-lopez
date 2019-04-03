import React from 'react';

export const Error = (props) => {
    return (
        <p className="error"><span role="img" aria-label="error-message">⛔</span>{ props.message }</p>
    )
};
