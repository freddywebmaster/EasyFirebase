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
const firestore_1 = require("firebase/firestore");
class Firestore {
    constructor(dbConfig) {
        this.db = dbConfig;
    }
    addDoc(colleccion, data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== 'string')
                return console.error('The id is not a String');
            try {
                if (id.trim() === '') {
                    const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(this.db, colleccion), data);
                    data.id = docRef.id;
                    return data;
                }
                else {
                    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(this.db, colleccion, id), data);
                    data.id = id;
                    return data;
                }
            }
            catch (e) {
                console.error("Error adding document: ", e);
                return e;
            }
        });
    }
    updateDoc(colleccion, docId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docRef = (0, firestore_1.doc)(this.db, colleccion, docId);
                (0, firestore_1.setDoc)(docRef, newData, { merge: true });
                newData.id = docId;
                return newData;
            }
            catch (e) {
                console.error("Error updating document: ", e);
                return e;
            }
        });
    }
    deleteDoc(colleccion, idDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(this.db, colleccion, idDoc));
                return idDoc;
            }
            catch (e) {
                console.error("Error deleting document: ", e);
                return e;
            }
        });
    }
    deleteOrAddInDocArray(colleccion, idDoc, field, data, type = 'add') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docRef = (0, firestore_1.doc)(this.db, colleccion, idDoc);
                yield (0, firestore_1.updateDoc)(docRef, {
                    [field]: type !== 'remove' ? (0, firestore_1.arrayUnion)(data) : (0, firestore_1.arrayRemove)(data),
                });
                const msg = { id: idDoc, removedData: data, array: field };
                return msg;
            }
            catch (e) {
                console.error("Error updating array document: ", e);
                return e;
            }
        });
    }
    incrementOrDecrementNumber(colleccion, docId, field, number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docRef = (0, firestore_1.doc)(this.db, colleccion, docId);
                yield (0, firestore_1.updateDoc)(docRef, {
                    [field]: (0, firestore_1.increment)(number),
                });
                return true;
            }
            catch (e) {
                console.error("Error increment in document: ", e);
                return e;
            }
        });
    }
    deleteFieldInDoc(colleccion, docId, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docRef = (0, firestore_1.doc)(this.db, colleccion, docId);
                yield (0, firestore_1.updateDoc)(docRef, {
                    [field]: (0, firestore_1.deleteField)(),
                });
                return { fieldRemoved: field, docId };
            }
            catch (e) {
                console.error("Error deleting field in document: ", e);
                return e;
            }
        });
    }
    getDocById(colleccion, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(this.db, colleccion, id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                let result = docSnap.data();
                result.id = docSnap.id;
                return result;
            }
            else {
                console.error("No such document!");
                return "No such document!";
            }
        });
    }
    getDocsByParam(colleccion, field, condition, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, colleccion), (0, firestore_1.where)(field, condition, param));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            const result = [];
            yield querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            return result;
        });
    }
    getAllInCollection(colleccion) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(this.db, colleccion));
            const result = [];
            yield querySnapshot.forEach((doc) => {
                result.push({ id: doc.id, data: doc.data() });
            });
            return result;
        });
    }
    getDocByIdInRealTime(colleccion, id, callBack) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, firestore_1.onSnapshot)((0, firestore_1.doc)(this.db, colleccion, id), function (doc) {
                    callBack(doc.data());
                });
            }
            catch (error) {
                return error;
            }
        });
    }
    getDocsByParamInRealTime(colleccion, field, condition, param, callBack) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, colleccion), (0, firestore_1.where)(field, condition, param));
            return (0, firestore_1.onSnapshot)(q, (querySnapshot) => {
                const result = [];
                querySnapshot.forEach((doc) => {
                    result.push({ id: doc.id, data: doc.data() });
                });
                callBack(result);
            });
        });
    }
}
exports.default = Firestore;
