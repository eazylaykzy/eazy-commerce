import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {ReactComponent as Logo} from '../../assets/eazy-commerce-logo.png';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
	const priveForStripe = price * 100;
	const publishablekey = 'pk_test_XZXID3TFutKl1k2mP1LrEjam003hZmQnq1';

	let stripeLogo = 'https://babsina.me/wp-content/uploads/2019/09/eazy-commerce-logo.svg';
	if (process.env.NODE_ENV === 'production') {
		stripeLogo = Logo;
	}

	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priveForStripe,
				token
			}
		}).then(response => {
			alert('Payment was successful');
			console.log(response)
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
			image= {stripeLogo}
			description={`Total amount of items in cart is $${price}`}
			amount={priveForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishablekey}/>
	)
};

export default StripeCheckoutButton;