import React, {useState} from 'react';
import {connect} from "react-redux";

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import {emailSignUpStart} from "../../redux/user/user.actions";

import './signup.scss';

const SignUp = ({emailSignUpStart}) => {
	const [userCredentials, setUserCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const {displayName, email, password, confirmPassword} = userCredentials;
	const handleSubmit = async event => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert(`Passwords don't match`);
			return;
		}

		emailSignUpStart({displayName, email, password});
	};
	const handleChange = event => {
		const {name, value} = event.target;

		setUserCredentials({...userCredentials, [name]: value});
	};

	return (
		<div className='sign-up'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required/>
				<FormInput
					type="email"
					name='email'
					value={email}
					onChange={handleChange}
					label="Email"
					required/>
				<FormInput
					type="password"
					name='password'
					value={password}
					onChange={handleChange}
					label="Password"
					required/>
				<FormInput
					type="password"
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label="Confirm Password"
					required/>
				<CustomButton type='submit'>Sign Up</CustomButton>
			</form>
		</div>
	)
};

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (userCredentials) => dispatch(emailSignUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);