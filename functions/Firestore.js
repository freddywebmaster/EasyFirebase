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
} from "firebase/firestore";

class Firestore {

  constructor(db){
    this.db = db;
  }

  async addDoc(colleccion, data, id="") {
    if(typeof id !== 'string') return console.error('The id is not a String');
    try {
      if(id.trim() === ''){
        const docRef = await addDoc(collection(this.db, colleccion), data);
        data.id = docRef.id;
        return data;
      }else{
        await setDoc(doc(this.db, colleccion, id), data);
        data.id = id;
        return data;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return e;
    }
  }

  async updateDoc(colleccion, docId, newData) {
    try {
      const docRef = doc(this.db, colleccion, docId);
      setDoc(docRef, newData, { merge: true });
      newData.id = docId;
      return newData;
    } catch (e) {
      console.error("Error updating document: ", e);
      return e;
    }
  }

  async deleteDoc(colleccion, idDoc) {
    try {
      await deleteDoc(doc(this.db, colleccion, idDoc));
      return idDoc;
    } catch (e) {
      console.error("Error deleting document: ", e);
      return e;
    }
  }

  async deleteOrAddInDocArray(colleccion, idDoc, field, data, type='add') {
    try {
      const docRef = doc(this.db, colleccion, idDoc);
      await updateDoc(docRef, {
        [field]: type !== 'remove' ? arrayUnion(data) : arrayRemove(data),
      });
      const msg = { id: idDoc, removedData: data, array: field };
      return msg;
    } catch (e) {
      console.error("Error updating array document: ", e);
      return e;
    }
  }

  async incrementOrDecrementNumber(colleccion, docId, field, number) {
    try {
      const docRef = doc(this.db, colleccion, docId);
      await updateDoc(docRef, {
        [field]: increment(number),
      });
      return true;
    } catch (e) {
      console.error("Error increment in document: ", e);
      return e;
    }
  }

  async deleteFieldInDoc(colleccion, docId, field) {
    try {
      const docRef = doc(this.db, colleccion, docId);
      await updateDoc(docRef, {
        [field]: deleteField(),
      });
      return { fieldRemoved: field, docId };
    } catch (e) {
      console.error("Error deleting field in document: ", e);
      return e;
    }
  }

  async getDocById(colleccion, id) {
    const docRef = doc(this.db, colleccion, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let result = docSnap.data();
      result.id = docSnap.id;
      return result;
    } else {
      console.error("No such document!");
      return "No such document!";
    }
  }

  async getDocsByParam(colleccion, field, condition, param) {
    const q = query(collection(this.db, colleccion), where(field, condition, param));
    const querySnapshot = await getDocs(q);
    const result = [];
    await querySnapshot.forEach((doc) => {
      let item = doc.data();
      item.id = doc.id;
      result.push(item);
    });

    return result;
  }

  async getAllInCollection(colleccion) {
    const querySnapshot = await getDocs(collection(this.db, colleccion));
    const result = [];
    await querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, data: doc.data() });
    });
    return result;
  }

  async getDocByIdInRealTime(colleccion, id, callBack) {
    try {
      return onSnapshot(doc(this.db, colleccion, id), function (doc) {
        callBack(doc.data());
      });
    } catch (error) {
      return error;
    }
  }

  async getDocsByParamInRealTime(
    colleccion,
    field,
    condition,
    param,
    callBack
  ) {
    const q = query(collection(this.db, colleccion), where(field, condition, param));
    return onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({id: doc.id, data: doc.data()});
      });
      callBack(result);
    });
  }

}

export default Firestore;