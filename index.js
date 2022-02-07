import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const EaseFirebase = ( appCredentials ) => {
    //initialize firebase app
    const app = initializeApp(appCredentials);

    // return instace whit app configurated
    return {
        app
    }
}

export default EaseFirebase;