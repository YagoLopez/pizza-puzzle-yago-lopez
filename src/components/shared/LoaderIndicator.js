import React from 'react';

export const LoaderIndicator = (props) => {
    return (
        <p>{ props.message || 'Loading...' }</p>
    )
};
