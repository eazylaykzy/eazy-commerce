import {takeLatest, call, put, all} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsSuccess, fetchCollectionsFailure} from "../../redux/shop/shop.actions";

export function* fetchCollectionsAsync() {
	try {
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	} catch (e) {
		yield put(fetchCollectionsFailure(e.message))
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionsAsync
	)
}

export function* shopSaga() {
	yield all([call(shopSaga)])
}