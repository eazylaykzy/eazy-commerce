import React from 'react';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {Link} from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

import {
	CheckoutPageContainer,
	CheckoutHeaderContainer,
	HeaderBlockContainer,
	TotalContainer,
	WarningContainer
} from './checkout.styles';

const buttonStyle = {
	display: 'inline-flex',
	marginTop: '10px'
};

const CheckoutPage = ({cartItems, total}) => (
	<CheckoutPageContainer>
		<CheckoutHeaderContainer>
			<HeaderBlockContainer>
				<span>Product</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Description</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Quantity</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Price</span>
			</HeaderBlockContainer>
			<HeaderBlockContainer>
				<span>Remove</span>
			</HeaderBlockContainer>
		</CheckoutHeaderContainer>
		{
			cartItems.map(cartItem => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem}/>
			))
		}
		{cartItems < 1 ? <div style={buttonStyle}>There are no items in your cart, please click the button to continue to shop.<Link to='/shop'><CustomButton style={buttonStyle} inverted>Shop</CustomButton></Link></div> : <TotalContainer>TOTAL: ${total}</TotalContainer>}
		<WarningContainer>
			*Please use the following test credit card for checkout payments* <br/>
			Card: 5105-1051-0510-5100 Exp: 01/20 CVV: 123 (Mastercard)<br/>
			Card: 4242-4242-4242-4242 Exp: 01/20 CVV: 123 (Visa Card)
		</WarningContainer>
		{cartItems < 1 ? null : <StripeCheckoutButton paymentSuccessful price={total}/>}
	</CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);