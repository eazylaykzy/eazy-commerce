import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyBKO61rgkeXluKF-2KVuglXXd59EPQHqXM",
	authDomain: "eazycommercedb.firebaseapp.com",
	databaseURL: "https://eazycommercedb.firebaseio.com",
	projectId: "eazycommercedb",
	storageBucket: "",
	messagingSenderId: "288569074768",
	appId: "1:288569074768:web:96931171d480b929"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (e) {
			console.log('error creating user', e.message);
		}
	}
	return userRef;
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {})
};

export const getCurrentUser = () => {
	return new Promise((res, rej) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			res(userAuth);
		}, rej)
	})
};

/*export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj)
	});

	return await batch.commit()
};*/

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;