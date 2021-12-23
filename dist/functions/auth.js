"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const provider = new auth_1.GoogleAuthProvider();
class Authentication {
    constructor(authConfig) {
        this.auth = authConfig;
    }
    createAccount(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.createUserWithEmailAndPassword)(this.auth, email, password);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loginAccount(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    loginGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, auth_1.signInWithPopup)(this.auth, provider);
                const credential = auth_1.GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Authentication;
