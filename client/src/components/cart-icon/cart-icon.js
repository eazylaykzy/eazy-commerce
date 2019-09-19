import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

import {ReactComponent as ShoppingIcon} from
		"../../assets/shopping-bag.svg";

import './cart-icon.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => (
	<div className='cart-icon' onClick={toggleCartHidden}>
		<ShoppingIcon className='shopping-icon'/>
		{
			itemCount < 100 ? <span className='item-count'>{itemCount}</span>
				: <span className='item-count'>99<sup>+</sup></span>
		}
	</div>
);

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
	itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);