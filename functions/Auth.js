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
  updateProfile,
  updatePassword
} from "firebase/auth";
import Firestore from "./Firestore";

const googleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const GithubProvider = new GithubAuthProvider();

class Authentication {
  constructor(app) {
    this.auth = getAuth(app);
    this.db = new Firestore(app);
    this.collection = "users";
    this.loading = false;
  }

  async createAccount(email, password, name = "") {
    try {
      const newUser = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (name !== "")
        await updateProfile(this.auth.currentUser, { displayName: name });

      return {
        error: false,
        message: "Account created succesfully",
        user: newUser.user,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        user: null
      };
    }
  }

  async loginAccount(email, password) {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      return {
        error: false,
        message: "Login successfully",
        user: res.user
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
        user: null
      };
    }
  }

  async loginGoogle() {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);

      return {
        error: false,
        message: "Authentication successfully",
        user: result.user
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async loginGithub() {
    try {
      const result = await signInWithPopup(this.auth, GithubProvider);

      return {
        error: false,
        message: "Authentication successfully",
        user: result.user,
      };
    } catch (error) {
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        return {
          error: true,
          message:
            "the email already use in other provider, (github, facebook, email, etc)",
            user: null
        };
      return {
        error: true,
        message: error.message,
        user: null
      };
    }
  }


  /*loginFacebook() {
        signInWithPopup(this.auth, FacebookProvider)
            .then((result) => {
                const user = result.user;
                return user;
            })
            .catch((error) => {
                return error;
            });
    }*/

  /*async changeNameUser(newName) {
        try {
            await this.auth.currentUser.updateProfile({ displayName: newName });
            const  res = await this.saveUserData({
                name: newName
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }*/

    async updatePass(password, newPassword, callback){
      const user = this.auth.currentUser;
      await this.reAuthUser(password, ()=>{
        updatePassword(user, newPassword).then(()=>{
          callback();
        }).catch((e)=>{
          console.log(e);
        })
      })
    }

  reAuthUser(password, callBack) {
    const user = this.auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email.toLowerCase(),
      password
    );
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        callBack();
      })
      .catch((error) => {
        return error;
      });
  }

  async closeSession() {
    try {
      await this.auth.signOut();
      return {
        error: false,
        message: "signOut successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}

export default Authentication;