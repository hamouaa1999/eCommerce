import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBj898LsxPd-7POXIV8v_wyclEYvSGXAkc",
    authDomain: "crwn-clothing-db-8ba8e.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-8ba8e.firebaseio.com",
    projectId: "crwn-clothing-db-8ba8e",
    storageBucket: "",
    messagingSenderId: "210907398916",
    appId: "1:210907398916:web:414b83436861ecdd"
};

export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = userRef.get();

    if (!snapShot.exists) {
        const {email, displayName} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                email,
                displayName,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("Error while creating the user ", error.message);
        }

    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;