import React from 'react';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import {paymentSuccessful} from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({price, paymentSuccessful}) => {
	const priceForStripe = price * 100;
	const publishablekey = 'pk_test_XZXID3TFutKl1k2mP1LrEjam003hZmQnq1';

	const onToken = (token) => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token
			}
		}).then(response => {
			paymentSuccessful();
			alert('Payment was successful');
		}).catch(err => {
			console.log(err);
			alert('There was an issue with your payment, please make sure to use the provided test card')
		})
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='Eazy Commerce'
			billingAddress
			shippingAddress
			image= 'https://babsina.me/wp-content/uploads/2019/09/eazy-commerce-logo.svg'
			description={`Total amount of items in cart is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishablekey}/>
	)
};

const mapDispatchToProps = dispatch => ({
	paymentSuccessful: () => dispatch(paymentSuccessful())
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);