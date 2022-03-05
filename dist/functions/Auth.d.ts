import { FirebaseApp } from "firebase/app";
import { IAuthResponse, IUpdateProfile, AuthFunctions } from "../interfaces/IAuth";
export declare class Authentication implements AuthFunctions {
    private auth;
    constructor(app: FirebaseApp);
    createAccount(email: string, password: string, name?: string): Promise<IAuthResponse>;
    loginAccount(email: string, password: string): Promise<IAuthResponse>;
    loginGoogle(): Promise<IAuthResponse>;
    loginGithub(): Promise<IAuthResponse>;
    loginFacebook(): Promise<IAuthResponse>;
    loginTwitter(): Promise<IAuthResponse>;
    updatePass(password: string, newPassword: string, callback?: Function): Promise<void>;
    UpdateProfile(data: IUpdateProfile, callback?: Function): Promise<void>;
    reAuthUser(password: string, callBack: Function): Promise<void>;
    sendVerification(callback?: Function): Promise<void>;
    sendResetPassword(email: string, callback: Function): Promise<void>;
    deleteAccount(password: string, callback: Function): Promise<void>;
    updateEmail(password: string, newEmail: string, callback?: Function): Promise<void>;
    closeSession(callback?: Function): Promise<void>;
}
