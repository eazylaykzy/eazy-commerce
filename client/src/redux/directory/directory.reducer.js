const INITIAL_STATE = {
	sections: [
		{
			title: 'hats',
			imageUrl: 'https://images.unsplash.com/photo-1491617636265-a676d2700d7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
			id: 1,
			linkUrl: 'shop/hats'
		},
		{
			title: 'jackets',
			imageUrl: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
			id: 2,
			linkUrl: 'shop/jackets'
		},
		{
			title: 'sneakers',
			imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			id: 3,
			linkUrl: 'shop/sneakers'
		},
		{
			title: 'womens',
			imageUrl: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
			size: 'large',
			id: 4,
			linkUrl: 'shop/womens'
		},
		{
			title: 'mens',
			imageUrl: 'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
			size: 'large',
			id: 5,
			linkUrl: 'shop/mens'
		}
	]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state
	}
};

export default directoryReducer;