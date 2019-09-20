import {takeLatest, all, call, put} from 'redux-saga/effects';

import userActionTypes from '../user/user.types';
import CartActionTypes from './cart.types';
import {clearCart} from "./cart.actions";

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* onSignOutSuccess() {
	yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* clearCartOnPaymentSuccessful() {
	yield put(clearCart());
}

export function* onPaymentSuccessful() {
	yield takeLatest(CartActionTypes.PAYMENT_SUCCESSFUL, clearCartOnPaymentSuccessful);
}

export function* cartSaga() {
	yield all([
		call(onSignOutSuccess),
		call(onPaymentSuccessful),
	]);
}
