"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/firestore");
require("firebase/compat/auth");
require("firebase/storage");
const EaseFirebase = (appCredentials) => {
    //initialize firebase app
    const app = (!app_1.default.apps.length) ?
        app_1.default.initializeApp(appCredentials) :
        app_1.default.app();
    const auth = app_1.default.auth(app);
    const db = app_1.default.firestore(app);
    const storage = app_1.default.storage(app);
    // return instaces whit app configurated
    return {
        auth, db, storage
    };
};
exports.default = EaseFirebase;
