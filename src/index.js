import firebase from 'firebase/compat/app';

const EaseFirebase = (appCredentials) => {
    //initialize firebase app

    const config = (!firebase.apps.length) ? 
    firebase.initializeApp(appCredentials) : 
    firebase.app();

    // return instaces whit app configurated
    return {
        config
    }
}

export default EaseFirebase;