import React from 'react';
import { SignUpLink } from './SignUpLink';
import { SignInForm } from './SignInForm';

export const SignInPage = () => (
    <div className="page">
        <h1 className="responsive">Sign In Page</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);
