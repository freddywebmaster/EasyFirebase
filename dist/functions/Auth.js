"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const auth_1 = require("firebase/auth");
const googleProvider = new auth_1.GoogleAuthProvider();
const GithubProvider = new auth_1.GithubAuthProvider();
const FacebookProvider = new auth_1.FacebookAuthProvider();
const TwitterProvider = new auth_1.TwitterAuthProvider();
class Authentication {
    constructor(app) {
        this.auth = (0, auth_1.getAuth)(app);
    }
    async createAccount(email, password, name) {
        try {
            const newUser = await (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
            if (name)
                await (0, auth_1.updateProfile)(this.auth.currentUser, {
                    displayName: name,
                });
            return {
                error: false,
                message: "Account created succesfully",
                user: newUser.user,
            };
        }
        catch (error) {
            return {
                error: true,
                message: error.message || error,
                user: null,
            };
        }
    }
    async loginAccount(email, password) {
        try {
            const res = await (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
            return {
                error: false,
                message: "Login successfully",
                user: res.user,
            };
        }
        catch (error) {
            return {
                error: true,
                message: error.message,
                user: null,
            };
        }
    }
    async loginGoogle() {
        try {
            const result = await (0, auth_1.signInWithPopup)(this.auth, googleProvider);
            return {
                error: false,
                message: "Authentication successfully",
                user: result.user,
            };
        }
        catch (error) {
            return {
                error: true,
                message: error.message,
            };
        }
    }
    async loginGithub() {
        try {
            const result = await (0, auth_1.signInWithPopup)(this.auth, GithubProvider);
            return {
                error: false,
                message: "Authentication successfully",
                user: result.user,
            };
        }
        catch (error) {
            if (error.message ===
                "Firebase: Error (auth/account-exists-with-different-credential).")
                return {
                    error: true,
                    message: "the email already use in other provider, (github, facebook, email, etc)",
                    user: null,
                };
            return {
                error: true,
                message: error.message,
                user: null,
            };
        }
    }
    async loginFacebook() {
        try {
            const res = await (0, auth_1.signInWithPopup)(this.auth, FacebookProvider);
            return {
                error: false,
                message: "Authentication successfully",
                user: res.user,
            };
        }
        catch (error) {
            if (error.message ===
                "Firebase: Error (auth/account-exists-with-different-credential).")
                return {
                    error: true,
                    message: "the email already use in other provider, (github, facebook, email, etc)",
                    user: null,
                };
            return {
                error: true,
                message: error.message,
                user: null,
            };
        }
    }
    async loginTwitter() {
        try {
            const res = await (0, auth_1.signInWithPopup)(this.auth, TwitterProvider);
            return {
                error: false,
                message: "Authentication successfully",
                user: res.user,
            };
        }
        catch (error) {
            if (error.message ===
                "Firebase: Error (auth/account-exists-with-different-credential).")
                return {
                    error: true,
                    message: "the email already use in other provider, (github, facebook, email, etc)",
                    user: null,
                };
            return {
                error: true,
                message: error.message,
                user: null,
            };
        }
    }
    async updatePass(password, newPassword, callback) {
        try {
            const user = this.auth.currentUser;
            await this.reAuthUser(password, () => {
                (0, auth_1.updatePassword)(user, newPassword)
                    .then(() => {
                    if (callback)
                        callback(user);
                })
                    .catch((error) => {
                    console.log(error);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async UpdateProfile(data, callback) {
        try {
            await (0, auth_1.updateProfile)(this.auth.currentUser, data)
                .then(() => {
                if (callback)
                    callback();
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    reAuthUser(password, callBack) {
        var _a;
        const user = this.auth.currentUser;
        const credential = auth_1.EmailAuthProvider.credential(((_a = user.email) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "null", password);
        return (0, auth_1.reauthenticateWithCredential)(user, credential)
            .then(() => {
            callBack(user);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    async sendVerification(callback) {
        try {
            await (0, auth_1.sendEmailVerification)(this.auth.currentUser).then(() => {
                if (callback)
                    callback();
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendResetPassword(email, callback) {
        try {
            await (0, auth_1.sendPasswordResetEmail)(this.auth, email)
                .then(() => {
                callback();
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteAccount(password, callback) {
        try {
            await this.reAuthUser(password, async () => {
                await (0, auth_1.deleteUser)(this.auth.currentUser)
                    .then(() => {
                    callback();
                })
                    .catch((error) => {
                    console.log(error);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateEmail(password, newEmail, callback) {
        try {
            await this.reAuthUser(password, async () => {
                await (0, auth_1.updateEmail)(this.auth.currentUser, newEmail)
                    .then(() => {
                    if (callback)
                        callback();
                })
                    .catch((error) => {
                    console.log(error);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async closeSession(callback) {
        try {
            await (0, auth_1.signOut)(this.auth)
                .then(() => {
                if (callback)
                    callback();
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.Authentication = Authentication;
