"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firestore = void 0;
const firestore_1 = require("firebase/firestore");
class Firestore {
    constructor(app) {
        this.db = (0, firestore_1.getFirestore)(app);
    }
    async addDoc(col, data, id) {
        try {
            if (!id) {
                const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(this.db, col), data);
                data.id = docRef.id;
                return data;
            }
            else {
                await (0, firestore_1.setDoc)((0, firestore_1.doc)(this.db, col, id), data, { merge: true });
                data.id = id;
                return { data, error: false, message: "Ok" };
            }
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async updateDoc(col, docId, newData, merge = true) {
        try {
            const docRef = (0, firestore_1.doc)(this.db, col, docId);
            (0, firestore_1.setDoc)(docRef, newData, { merge: merge });
            newData.id = docId;
            return { data: newData, error: false, message: "Ok" };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async deleteDoc(col, idDoc) {
        const docSearch = await this.getDocById(col, idDoc);
        if (docSearch.error)
            return { error: true, message: "doc not exist" };
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(this.db, col, idDoc));
            return { error: false, message: `doc deleted: ${idDoc}` };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async addInArray(col, id, field, data) {
        try {
            const docRef = (0, firestore_1.doc)(this.db, col, id);
            await (0, firestore_1.updateDoc)(docRef, {
                [field]: (0, firestore_1.arrayUnion)(data),
            });
            return { error: false, message: "Ok" };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async deleteInArray(col, id, field, data) {
        try {
            const docRef = (0, firestore_1.doc)(this.db, col, id);
            await (0, firestore_1.updateDoc)(docRef, {
                [field]: (0, firestore_1.arrayRemove)(data),
            });
            return { error: false, message: "Ok" };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async incOrDecNumber(col, docId, field, number) {
        try {
            const docRef = (0, firestore_1.doc)(this.db, col, docId);
            await (0, firestore_1.updateDoc)(docRef, {
                [field]: (0, firestore_1.increment)(number),
            });
            return { error: false, message: "Ok" };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async deleteField(col, docId, field) {
        try {
            const docRef = (0, firestore_1.doc)(this.db, col, docId);
            await (0, firestore_1.updateDoc)(docRef, {
                [field]: (0, firestore_1.deleteField)(),
            });
            return { error: false, message: "Ok" };
        }
        catch (e) {
            return { error: true, message: e.message };
        }
    }
    async getDocById(col, id) {
        const docRef = (0, firestore_1.doc)(this.db, col, id);
        const docSnap = await (0, firestore_1.getDoc)(docRef);
        if (docSnap.exists()) {
            let result = docSnap.data();
            result.id = docSnap.id;
            return { error: false, message: "Doc exists", data: result };
        }
        else {
            return { error: true, message: "Doc not exist" };
        }
    }
    async getDocsByParam(col, field, condition, param) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, col), (0, firestore_1.where)(field, condition, param));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const result = [];
            await querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            return { error: false, message: "Ok", data: result };
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async getAllInCol(col) {
        try {
            const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(this.db, col));
            const result = [];
            await querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            return { data: result, error: false, message: "Ok" };
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async getDocByIdRT(col, id, callBack) {
        try {
            return (0, firestore_1.onSnapshot)((0, firestore_1.doc)(this.db, col, id), function (doc) {
                callBack(doc.data());
            });
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async getDocsByParamRT(col, field, condition, param, callBack) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, col), (0, firestore_1.where)(field, condition, param));
            return (0, firestore_1.onSnapshot)(q, (querySnapshot) => {
                const result = [];
                querySnapshot.forEach((doc) => {
                    let item = doc.data();
                    item.id = doc.id;
                    result.push(item);
                });
                callBack(result);
            });
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async arrayContainsAny(col, field, array) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, col), (0, firestore_1.where)(field, "array-contains-any", array));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const result = [];
            await querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            return { data: result, error: false, message: "ok" };
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async arrayContains(col, field, value) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(this.db, col), (0, firestore_1.where)(field, "array-contains", value));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const result = [];
            await querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            return { data: result, error: false, message: "Ok" };
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
    async getMultipleCol(arrayCollections) {
        try {
            let results = {};
            await arrayCollections.map(async (col) => {
                const res = await this.getAllInCol(col);
                results[col] = res;
            });
            return { data: results, error: false, message: "Ok" };
        }
        catch (error) {
            return { error: true, message: error };
        }
    }
}
exports.Firestore = Firestore;
