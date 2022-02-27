"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = exports.Firestore = exports.Authentication = void 0;
const Auth_1 = require("./Auth");
Object.defineProperty(exports, "Authentication", { enumerable: true, get: function () { return Auth_1.Authentication; } });
const Firestore_1 = require("./Firestore");
Object.defineProperty(exports, "Firestore", { enumerable: true, get: function () { return Firestore_1.Firestore; } });
const Storage_1 = require("./Storage");
Object.defineProperty(exports, "Storage", { enumerable: true, get: function () { return Storage_1.Storage; } });
