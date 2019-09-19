import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import CartIcon from '../cart-icon/cart-icon';
import CartItemDropdown from '../cart-item-dropdown/cart-item-dropdown';
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selectors";

import {signOutStart} from "../../redux/user/user.actions";

import {ReactComponent as Logo} from '../../assets/eazy-commerce-logo.svg';
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';

const Header = ({currentUser, hidden, signOutStart}) => (
	<HeaderContainer>
		<LogoContainer to="/">
			<Logo className='logo'/>
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>Shop</OptionLink>
			<OptionLink to='/contact'>Contact</OptionLink>
			{
				currentUser ?
					<OptionLink as='div' onClick={signOutStart}>Sign Out</OptionLink> :
					<OptionLink to='/signin'>Sign In</OptionLink>
			}
			<CartIcon/>
		</OptionsContainer>
		{hidden ? null : <CartItemDropdown/>}
	</HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);