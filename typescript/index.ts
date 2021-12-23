import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/storage';
import { iCredentials } from './interfaces';

const EaseFirebase = ( appCredentials: iCredentials ) => {
    //initialize firebase app

    const app = (!firebase.apps.length) ? 
    firebase.initializeApp(appCredentials) : 
    firebase.app();

    const auth = firebase.auth(app);

    const db = firebase.firestore(app);

    const storage = firebase.storage(app);

    // return instaces whit app configurated
    return {
        auth, db, storage
    }
}

export default EaseFirebase;