import { User } from "firebase/auth";
import { Auth } from "firebase/auth";

import { FirebaseApp } from "firebase/app";

export interface IAuthResponse {
  error: boolean;
  message: string;
  user?: User | null;
}

export interface IUpdateProfile {
  displayName?: string;
  photoURL?: string;
}

export interface AuthFunctions {
  auth: Auth;
  createAccount(
    email: string,
    password: string,
    name?: string
  ): Promise<IAuthResponse>;
  loginAccount(email: string, password: string): Promise<IAuthResponse>;
  loginGoogle(): Promise<IAuthResponse>;
  loginGithub(): Promise<IAuthResponse>;
  loginFacebook(): Promise<IAuthResponse>;
  loginTwitter(): Promise<IAuthResponse>;
  updatePass(
    password: string,
    newPassword: string,
    callback?: Function
  ): Promise<void>;
  UpdateProfile(data: IUpdateProfile, callback?: Function): Promise<void>;
  reAuthUser(password: string, callBack: Function): Promise<void>;
  sendVerification(callback?: Function): Promise<void>;
  sendResetPassword(email: string, callback: Function): Promise<void>;
  deleteAccount(password: string, callback: Function): Promise<void>;
  updateEmail(
    password: string,
    newEmail: string,
    callback?: Function
  ): Promise<void>;
  closeSession(callback?: Function): Promise<void>;
}
