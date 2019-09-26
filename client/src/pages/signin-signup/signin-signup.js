import React from 'react';

import SignIn from '../../components/signin/signin';
import SignUp from '../../components/signup/signup';

import { SignInAndSignUpContainer } from './signin-signup.styles';

const SignInSignUpPage = () => (
	<SignInAndSignUpContainer>
		<SignIn/>
		<SignUp/>
	</SignInAndSignUpContainer>
);

export default SignInSignUpPage;