"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEasyFirebase = void 0;
const app_1 = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");
const initEasyFirebase = (appCredentials, nameApp) => {
    //initialize firebase app
    const app = (0, app_1.initializeApp)(appCredentials, nameApp || "[DEFAULT]");
    // return instace with app configurated
    return app;
};
exports.initEasyFirebase = initEasyFirebase;
