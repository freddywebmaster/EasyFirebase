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
  getFirestore,
  Firestore as Fire,
  WhereFilterOp,
  Unsubscribe,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

import { FirestoreFunctions, IResponse } from "../interfaces/IFirestore";

export class Firestore implements FirestoreFunctions {
  private db: Fire;
  constructor(app: FirebaseApp) {
    this.db = getFirestore(app);
  }

  public async addDoc(col: string, data: any, id?: string): Promise<IResponse> {
    try {
      if (!id) {
        const docRef = await addDoc(collection(this.db, col), data);
        data.id = docRef.id;
        return data;
      } else {
        await setDoc(doc(this.db, col, id), data, { merge: true });
        data.id = id;
        return { data, error: false, message: "Ok" };
      }
    } catch (e: any) {
      return { error: true, message: e.message };
    }
  }

  public async updateDoc(
    col: string,
    docId: string,
    newData: any,
    merge = true
  ): Promise<IResponse> {
    try {
      const docRef = doc(this.db, col, docId);
      setDoc(docRef, newData, { merge: merge });
      newData.id = docId;
      return { data: newData, error: false, message: "Ok" };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async deleteDoc(col: string, idDoc: string): Promise<IResponse> {
    const docSearch = await this.getDocById(col, idDoc);
    if (docSearch.error) return { error: true, message: "doc not exist" };
    try {
      await deleteDoc(doc(this.db, col, idDoc));
      return { error: false, message: `doc deleted: ${idDoc}` };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async addInArray(
    col: string,
    id: string,
    field: string,
    data: any
  ): Promise<IResponse> {
    try {
      const docRef = doc(this.db, col, id);
      await updateDoc(docRef, {
        [field]: arrayUnion(data),
      });

      return { error: false, message: "Ok" };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async deleteInArray(
    col: string,
    id: string,
    field: string,
    data: any
  ): Promise<IResponse> {
    try {
      const docRef = doc(this.db, col, id);
      await updateDoc(docRef, {
        [field]: arrayRemove(data),
      });

      return { error: false, message: "Ok" };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async incOrDecNumber(
    col: string,
    docId: string,
    field: string,
    number: number
  ): Promise<IResponse> {
    try {
      const docRef = doc(this.db, col, docId);
      await updateDoc(docRef, {
        [field]: increment(number),
      });
      return { error: false, message: "Ok" };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async deleteField(
    col: string,
    docId: string,
    field: string
  ): Promise<IResponse> {
    try {
      const docRef = doc(this.db, col, docId);
      await updateDoc(docRef, {
        [field]: deleteField(),
      });
      return { error: false, message: "Ok" };
    } catch (e: any) {
      return { error: true, message: e.message } as IResponse;
    }
  }

  public async getDocById(col: string, id: string): Promise<IResponse> {
    const docRef = doc(this.db, col, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let result = docSnap.data();
      result.id = docSnap.id;
      return { error: false, message: "Doc exists", data: result };
    } else {
      return { error: true, message: "Doc not exist" } as IResponse;
    }
  }

  public async getDocsByParam(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string
  ): Promise<IResponse> {
    try {
      const q = query(collection(this.db, col), where(field, condition, param));
      const querySnapshot = await getDocs(q);
      const result: Array<any> = [];
      await querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        result.push(item);
      });

      return { error: false, message: "Ok", data: result };
    } catch (error: any) {
      return { error: true, message: error } as IResponse;
    }
  }

  public async getAllInCol(col: string): Promise<IResponse> {
    try {
      const querySnapshot = await getDocs(collection(this.db, col));
      const result: Array<any> = [];
      await querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        result.push(item);
      });
      return { data: result, error: false, message: "Ok" };
    } catch (error: any) {
      return { error: true, message: error };
    }
  }

  public async getDocByIdRT(
    col: string,
    id: string,
    callBack: Function
  ): Promise<Unsubscribe | IResponse> {
    try {
      return onSnapshot(doc(this.db, col, id), function (doc) {
        callBack(doc.data());
      });
    } catch (error: any) {
      return { error: true, message: error } as IResponse;
    }
  }

  public async getDocsByParamRT(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string,
    callBack: Function
  ): Promise<Unsubscribe | IResponse> {
    try {
      const q = query(collection(this.db, col), where(field, condition, param));
      return onSnapshot(q, (querySnapshot) => {
        const result: Array<any> = [];
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id;
          result.push(item);
        });
        callBack(result);
      });
    } catch (error: any) {
      return { error: true, message: error } as IResponse;
    }
  }

  public async arrayContainsAny(
    col: string,
    field: string,
    array: Array<any>
  ): Promise<IResponse> {
    try {
      const q = query(
        collection(this.db, col),
        where(field, "array-contains-any", array)
      );
      const querySnapshot = await getDocs(q);
      const result: Array<any> = [];
      await querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        result.push(item);
      });

      return { data: result, error: false, message: "ok" };
    } catch (error: any) {
      return { error: true, message: error } as IResponse;
    }
  }

  public async arrayContains(
    col: string,
    field: string,
    value: any
  ): Promise<IResponse> {
    try {
      const q = query(
        collection(this.db, col),
        where(field, "array-contains", value)
      );
      const querySnapshot = await getDocs(q);
      const result: Array<any> = [];
      await querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        result.push(item);
      });

      return { data: result, error: false, message: "Ok" };
    } catch (error: any) {
      return { error: true, message: error } as IResponse;
    }
  }

  public async getMultipleCol(
    arrayCollections: Array<string>
  ): Promise<IResponse> {
    try {
      let results: any = {};

      await arrayCollections.map(async (col) => {
        const res = await this.getAllInCol(col);
        results[col] = res;
      });
      return { data: results, error: false, message: "Ok" };
    } catch (error) {
      return { error: true, message: error } as IResponse;
    }
  }
}
