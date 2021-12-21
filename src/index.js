import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { Firestore } from './functions';

const EaseFirebase = (appCredentials) => {
    //initialize firebase app
    if (!firebase.apps.length) {
        firebase.initializeApp(appCredentials);
    } else {
        firebase.app();
    }

    //create refs firebase
    const db = getFirestore();
    //create instance of my class firestore
    const firestore = new Firestore(db);


    // return instaces whit app configurated
    return {
        firestore
    }
}

export default EaseFirebase;