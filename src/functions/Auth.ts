import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GithubAuthProvider,
  updateProfile,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  Auth,
  User,
  sendPasswordResetEmail,
  deleteUser,
  signOut,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";

const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const TwitterProvider = new TwitterAuthProvider();

import { IAuthResponse, IUpdateProfile, AuthFunctions } from "../interfaces/IAuth";

export class Authentication implements AuthFunctions {
  private auth: Auth;

  constructor(app: FirebaseApp) {
    this.auth = getAuth(app);
  }

  public async createAccount(
    email: string,
    password: string,
    name?: string
  ): Promise<IAuthResponse> {
    try {
      const newUser = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (name)
        await updateProfile(this.auth.currentUser as User, {
          displayName: name,
        });

      return {
        error: false,
        message: "Account created succesfully",
        user: newUser.user,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message || error,
        user: null,
      };
    }
  }

  public async loginAccount(
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    try {
      const res = await signInWithEmailAndPassword(this.auth, email, password);
      return {
        error: false,
        message: "Login successfully",
        user: res.user,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
        user: null,
      };
    }
  }

  public async loginGoogle(): Promise<IAuthResponse> {
    try {
      const result = await signInWithPopup(this.auth, googleProvider);

      return {
        error: false,
        message: "Authentication successfully",
        user: result.user,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  public async loginGithub(): Promise<IAuthResponse> {
    try {
      const result = await signInWithPopup(this.auth, GithubProvider);
      return {
        error: false,
        message: "Authentication successfully",
        user: result.user,
      };
    } catch (error: any) {
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        return {
          error: true,
          message:
            "the email already use in other provider, (github, facebook, email, etc)",
          user: null,
        };
      return {
        error: true,
        message: error.message,
        user: null,
      };
    }
  }

  public async loginFacebook(): Promise<IAuthResponse> {
    try {
      const res = await signInWithPopup(this.auth, FacebookProvider);
      return {
        error: false,
        message: "Authentication successfully",
        user: res.user,
      };
    } catch (error: any) {
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        return {
          error: true,
          message:
            "the email already use in other provider, (github, facebook, email, etc)",
          user: null,
        };
      return {
        error: true,
        message: error.message,
        user: null,
      };
    }
  }

  public async loginTwitter(): Promise<IAuthResponse> {
    try {
      const res = await signInWithPopup(this.auth, TwitterProvider);
      return {
        error: false,
        message: "Authentication successfully",
        user: res.user,
      };
    } catch (error: any) {
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        return {
          error: true,
          message:
            "the email already use in other provider, (github, facebook, email, etc)",
          user: null,
        };
      return {
        error: true,
        message: error.message,
        user: null,
      };
    }
  }

  public async updatePass(
    password: string,
    newPassword: string,
    callback?: Function
  ): Promise<void> {
    try {
      const user = this.auth.currentUser as User;
      await this.reAuthUser(password, () => {
        updatePassword(user, newPassword)
          .then(() => {
            if (callback) callback(user);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async UpdateProfile(
    data: IUpdateProfile,
    callback?: Function
  ): Promise<void> {
    try {
      await updateProfile(this.auth.currentUser as User, data)
        .then(() => {
          if (callback) callback();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  public reAuthUser(password: string, callBack: Function): Promise<void> {
    const user = this.auth.currentUser as User;
    const credential = EmailAuthProvider.credential(
      user.email?.toLowerCase() || "null",
      password
    );
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        callBack(user);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  public async sendVerification(callback?: Function): Promise<void> {
    try {
      await sendEmailVerification(this.auth.currentUser as User).then(() => {
        if (callback) callback();
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendResetPassword(
    email: string,
    callback: Function
  ): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email)
        .then(() => {
          callback();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteAccount(
    password: string,
    callback: Function
  ): Promise<void> {
    try {
      await this.reAuthUser(password, async () => {
        await deleteUser(this.auth.currentUser as User)
          .then(() => {
            callback();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async updateEmail(
    password: string,
    newEmail: string,
    callback?: Function
  ): Promise<void> {
    try {
      await this.reAuthUser(password, async () => {
        await updateEmail(this.auth.currentUser as User, newEmail)
          .then(() => {
            if (callback) callback();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async closeSession(callback?: Function): Promise<void> {
    try {
      await signOut(this.auth)
        .then(() => {
          if (callback) callback();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}