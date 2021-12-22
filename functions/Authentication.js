import {auth} from './config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

const provider = new GoogleAuthProvider();

class Authentication{
    async createAccount(email, password){
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error); 
        }
    }

    async loginAccount(email, password){
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error); 
        }
    }

    async loginGoogle(){
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        } catch (error) {
            console.log(error);
        }
    }

}

const authentication = new Authentication();

export default authentication;