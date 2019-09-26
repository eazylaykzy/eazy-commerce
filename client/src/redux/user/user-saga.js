import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from "../../firebase/firebase.utils";

import {signInSuccess, signInFailure, signOutSuccess, signOutFailure, emailSignUpFailure, emailSignUpSuccess} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
	} catch (e) {
		yield put(signInFailure(e))
	}
}

export function* signInWithGoogle() {
	try {
		const {user} = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e))
	}
}

export function* signUpWithEmail({payload: {email, password, displayName}}) {
	try {
		const {user} = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(emailSignUpSuccess({user, additionalData: {displayName}}));
	} catch (e) {
		yield put(emailSignUpFailure(e));
	}
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInWithEmail({payload: {email, password}}) {
	try {
		const {user} = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e))
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth)
	} catch (e) {
		yield put(signInFailure(e))
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onEmailSignUpStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, signUpWithEmail)
}

export function* onEmailSignUpSuccess() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess())
	} catch (e) {
		yield put(signOutFailure(e))
	}
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSaga() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onEmailSignUpStart),
		call(onEmailSignUpSuccess),
		call(onSignOutStart),
	])
}

