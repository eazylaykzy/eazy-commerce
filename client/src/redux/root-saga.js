import {all, call} from 'redux-saga/effects';

import {fetchCollectionsStart} from "./shop/shop.sagas";
import {userSaga} from "./user/user-saga";
import {cartSaga} from "./cart/cart-saga";
import {shopSaga} from "./shop/shop.sagas";

export default function* rootSaga() {
	yield all([
		call(fetchCollectionsStart),
		call(userSaga),
		call(cartSaga),
		call(shopSaga),
	])
}