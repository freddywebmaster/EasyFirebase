import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/storage';

const EaseFirebase = ( appCredentials ) => {
    //initialize firebase app
    const app = (!firebase.apps.length) ? 
    firebase.initializeApp(appCredentials) : 
    firebase.app();

    // return instace whit app configurated
    return {
        app
    }
}

export default EaseFirebase;