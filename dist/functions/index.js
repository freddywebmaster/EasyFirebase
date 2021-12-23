"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.storage = exports.firestore = void 0;
const firestore_1 = __importDefault(require("./firestore"));
exports.firestore = firestore_1.default;
const storage_1 = __importDefault(require("./storage"));
exports.storage = storage_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
