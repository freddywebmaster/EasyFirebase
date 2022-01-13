import {
    collection,
    addDoc,
    getDocs,
    setDoc,
    doc,
    arrayUnion,
    updateDoc,
    arrayRemove,
    increment,
    deleteDoc,
    deleteField,
    getDoc,
    query,
    where,
    onSnapshot,
    getFirestore
} from "firebase/firestore";


class Firestore {
    constructor(app) {
        this.db = getFirestore(app);
    }

    async addDoc(col, data, id = '') {
        try {
            if (id.trim() === '') {
                const docRef = await addDoc(collection(this.db, col), data);
                data.id = docRef.id;
                return data;
            } else {
                await setDoc(doc(this.db, col, id), data, {merge: true});
                data.id = id;
                return data;
            }
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async updateDoc(col, docId, newData, merge = true) {
        try {
            const docRef = doc(this.db, col, docId);
            setDoc(docRef, newData, { merge: merge });
            newData.id = docId;
            return newData;
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async deleteDoc(col, idDoc) {
        const docSearch = await this.getDocById(col, idDoc);
        if(docSearch.error) return {error: true, message: 'doc not exist'}
        try {
            await deleteDoc(doc(this.db, col, idDoc));
            return { error: false, message: 'not errors' };
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async addInArray(col, id, field, data) {
        try {
            const docRef = doc(this.db, col, id);
            await updateDoc(docRef, {
                [field]: arrayUnion(data)
            });

            return { error: false };
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async deleteInArray(col, id, field, data) {
        try {
            const docRef = doc(this.db, col, id);
            await updateDoc(docRef, {
                [field]: arrayRemove(data)
            });

            return { error: false };
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async incrementOrDecrementNumber(col, docId, field, number) {
        try {
            const docRef = doc(this.db, col, docId);
            await updateDoc(docRef, {
                [field]: increment(number),
            });
            return { error: false };
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async deleteFieldInDoc(col, docId, field) {
        try {
            const docRef = doc(this.db, col, docId);
            await updateDoc(docRef, {
                [field]: deleteField(),
            });
            return { error: false };
        } catch (e) {
            return {error: true, message: e.message};
        }
    }

    async getDocById(col, id) {
        const docRef = doc(this.db, col, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let result = docSnap.data();
            result.id = docSnap.id;
            return result;
        } else {
            return {error: true, message: 'doc not exist'};
        }
    }

    async getDocsByParam(col, field, condition, param) {
        const q = query(collection(this.db, col), where(field, condition, param));
        const querySnapshot = await getDocs(q);
        const result = [];
        await querySnapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            result.push(item);
        });

        return result;
    }

    async getAllInCollection(col) {
        const querySnapshot = await getDocs(collection(this.db, col));
        const result = [];
        await querySnapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            result.push(item);
        });
        return result;
    }

    async getDocByIdInRealTime(col, id, callBack) {
        try {
            return onSnapshot(doc(this.db, col, id), function (doc) {
                callBack(doc.data());
            });
        } catch (error) {
            return error;
        }
    }

    async getDocsByParamInRealTime(
        col,
        field,
        condition,
        param,
        callBack
    ) {
        const q = query(collection(this.db, col), where(field, condition, param));
        return onSnapshot(q, (querySnapshot) => {
            const result = [];
            querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id;
                result.push(item);
            });
            callBack(result);
        });
    }

    async arrayContainsAny(col, field, array){
        const q = query(collection(this.db, col), where(field , 'array-contains-any', array));
        const querySnapshot = await getDocs(q);
        const result = [];
        await querySnapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            result.push(item);
        });

        return result;
    }

    async arrayContains(col, field, value){
        const q = query(collection(this.db, col), where(field , 'array-contains', value));
        const querySnapshot = await getDocs(q);
        const result = [];
        await querySnapshot.forEach((doc) => {
            let item = doc.data();
            item.id = doc.id;
            result.push(item);
        });

        return result;
    }

}

export default Firestore;