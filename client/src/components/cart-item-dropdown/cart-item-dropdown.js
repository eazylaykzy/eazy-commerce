import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';
import {createStructuredSelector} from "reselect";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

import './cart-item-dropdown.scss';

const CartItemDropdown = ({cartItems, history, dispatch}) => (
	<div className='cart-item-dropdown'>
		<div className='cart-items'>
			{cartItems.length ?
				cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
				: <span className='empty-message'>Your cart is empty</span>
			}
		</div>
		{cartItems < 1 ?
			<CustomButton onClick={
				() => {
					history.push('/shop');
					dispatch(toggleCartHidden())
				}}>
				Start Shopping
			</CustomButton> :
			<CustomButton onClick={
			() => {
				history.push('/checkout');
				dispatch(toggleCartHidden())
			}}>
			Go to checkout
		</CustomButton>}
	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartItemDropdown));