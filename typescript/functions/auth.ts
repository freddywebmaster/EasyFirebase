import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

const provider = new GoogleAuthProvider();

class Authentication{
    auth: any;
    constructor(authConfig: any){
        this.auth = authConfig;
    }

    async createAccount(email: string, password: string){
        try {
            await createUserWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            console.log(error); 
        }
    }

    async loginAccount(email: string, password: string){
        try {
            await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            console.log(error); 
        }
    }

    async loginGoogle(){
        try {
            const result = await signInWithPopup(this.auth, provider);
            const credential: any = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        } catch (error) {
            console.log(error);
        }
    }

}

export default Authentication;