import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";

import {HomePage} from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SigninSignup from './pages/signin-signup/signin-signup';
import CheckoutPage from './pages/checkout/checkout';
import Header from './components/header/header';
import {checkUserSession} from './redux/user/user.actions';

import './App.css';

const App = ({checkUserSession, currentUser}) => {
	useEffect(() => {
		checkUserSession()
	}, [checkUserSession]);

	return (
		<div>
			<Header/>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/shop' component={ShopPage}/>
				<Route exact path='/checkout' component={CheckoutPage}/>
				<Route
					exact path='/signin'
					render={() => currentUser ? (<Redirect to='/'/>) : (<SigninSignup/>)}/>
			</Switch>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
