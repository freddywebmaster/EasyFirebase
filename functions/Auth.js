import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
    GithubAuthProvider,
    FacebookAuthProvider,
    updateProfile
} from "firebase/auth";
import Firestore from './Firestore';
import { isError } from "util";

const googleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const GithubProvider = new GithubAuthProvider()

class Authentication {
    constructor(app) {
        this.auth = getAuth(app);
        this.db = new Firestore(app);
        this.collection = 'users';
        this.loading = false;
    }

    async createAccount(email, password, name = '') {

        /**
         * @user busca si hay emails registrados y retorna el error si ya existe
         */
        const user = await this.getUser('email', email.toLowerCase());
        if (user.exist) return {
            error: 'the email account already exist'
        }

        /**
         * @newUser registra el usuario con auth function
         * @newData guarda los datos de @newUser en firestore/users
         * @updateProfile si pasaron el parametro name se cambiara en nombre de usuario
         * @error si falla algo elimina los datos y el registro si es que llego a realizarlo
         */
        try {
            const newUser = await createUserWithEmailAndPassword(this.auth, email, password);
            if (name !== '') await updateProfile(this.auth.currentUser, { displayName: name });
            const newData = await this.saveUserData({
                name: name !== '' ? newUser.user.displayName : name,
                id: newUser.user.uid,
                email: newUser.user.email,
                provider: 'email'
            }, newUser.user.uid);

            return newUser.user;
        } catch (error) {
            const user = await this.getUser('email', email);
            if(user.exist){
                //delete user account
                try {
                    await this.auth.currentUser.delete();
                } catch (error) {
                    console.log('error deleting register');
                }
            }
            return error.message;
        }
    }

    async loginAccount(email, password) {
        try {
            await signInWithEmailAndPassword(this.auth, email, password)
        } catch (error) {
            return error.message;
        }
    }

    async loginGoogle() {
        try {
            const result = await signInWithPopup(this.auth, googleProvider);
            const user = result.user;
            const newUser = this.getUser('email', user.email);
            if (!newUser.exist || newUser.user.provider !== 'google') {
                this.saveUserData({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    provider: 'google'
                }, user.uid)
            }
            return user;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    async loginGithub() {

        try {
            const result = await signInWithPopup(this.auth, GithubProvider);
            const user = result.user;
            const newUser = await this.getUser('email', user.email);

            if (!newUser.exist || newUser.user.provider !== 'github') {
                await this.saveUserData({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    provider: 'github'
                }, user.uid);
            }
            return user;
        } catch (error) {
            if (error.message === 'Firebase: Error (auth/account-exists-with-different-credential).')
                return 'the email already use in other provider, (github, facebook, email, etc)';
            return error.message;
        }
    }

    async getUser(param, value) {
        const user = await this.db.getDocsByParam(this.collection, param, '==', value);
        if (user.length === 0) return {
            exist: false,
            user: {}
        }

        if (param === 'name') return {
            exist: true, user
        };
        if (param === 'uid' || param === 'email') return {
            exist: true, user: user[0]
        };
    }

    loginFacebook() {
        signInWithPopup(this.auth, FacebookProvider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
            })
            .catch((error) => {
                return error;
            });
    }

    async saveUserData(data, id) {
        try {
            const result = this.db.addDoc(this.collection, data, id);
            return result;
        } catch (error) {
            return error;
        }
    }


    async changeNameUser(newName) {
        try {
            await this.auth.currentUser.updateProfile({ displayName: newName })
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async reAuthUser(password, callBack) {
        const user = this.auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email.toLowerCase(), password)
        return reauthenticateWithCredential(user, credential).then(() => {
            callBack()
        }).catch((error) => {
            console.log(error);
            return error;
        });
    }

    async closeSession() {
        try {
            await this.auth.signOut()
        } catch (error) {
            console.log(error)
            return error;
        }
    }

}

export default Authentication;