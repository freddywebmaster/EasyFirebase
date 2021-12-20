import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { Firestore } from './functions';

const EaseFirebase = (appCredentials) => {
    //Inicilizar firebase app
    if (!firebase.apps.length) {
        firebase.initializeApp(appCredentials);
    } else {
        firebase.app();
    }

    //create refs firebase

    const db = getFirestore();


    //create instance class

    const firestore = new Firestore(db);


    // return the class

    return {
        firestore
    }
}

export default EaseFirebase;