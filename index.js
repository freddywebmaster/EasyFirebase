const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
require('firebase/compat/auth');
require('firebase/storage');

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
module.exports = EaseFirebase;