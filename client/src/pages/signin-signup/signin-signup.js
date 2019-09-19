import React from 'react';

import SignIn from '../../components/signin/signin';
import SignUp from '../../components/signup/signup';

import './signin-signup.scss';

const SigninSignup = () => (
	<div className='signin-signup'>
		<SignIn/>
		<SignUp/>
	</div>
);

export default SigninSignup;