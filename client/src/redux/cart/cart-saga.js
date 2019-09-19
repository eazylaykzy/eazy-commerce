import {takeLatest, all, call, put} from 'redux-saga/effects';

import userActionTypes from '../user/user.types';
import {clearCart} from "./cart.actions";

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* onSignOutSuccess() {
	yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* clearCartOnPaymentSuccful(statusCode) {
	yield takeLatest(userActionTypes.PAYMENT_SUCCESSFUL);
	yield put(clearCart());
}

export function* paymentSuccessful() {
	yield takeLatest(userActionTypes.PAYMENT_SUCCESSFUL);
	yield put(clearCart());
}

export function* paymentStart() {
	yield takeLatest(userActionTypes.PAYMENT_START, paymentSuccessful);
}

export function* cartSaga() {
	yield all([call(onSignOutSuccess)]);
}
