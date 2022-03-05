import { WhereFilterOp, Unsubscribe } from "firebase/firestore";

export interface IResponse {
  error: boolean;
  message: string;
  data?: any;
}

export interface FirestoreFunctions {
  addDoc(col: string, data: any, id?: string): Promise<IResponse>;
  updateDoc(
    col: string,
    docId: string,
    newData: any,
    merge: boolean
  ): Promise<IResponse>;
  deleteDoc(col: string, idDoc: string): Promise<IResponse>;
  addInArray(
    col: string,
    id: string,
    field: string,
    data: any
  ): Promise<IResponse>;
  deleteInArray(
    col: string,
    id: string,
    field: string,
    data: any
  ): Promise<IResponse>;
  incOrDecNumber(
    col: string,
    docId: string,
    field: string,
    number: number
  ): Promise<IResponse>;
  deleteField(col: string, docId: string, field: string): Promise<IResponse>;
  getDocById(col: string, id: string): Promise<IResponse>;
  getDocsByParam(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string
  ): Promise<IResponse>;
  getAllInCol(col: string): Promise<IResponse>;
  getDocByIdRT(
    col: string,
    id: string,
    callBack: Function
  ): Promise<Unsubscribe | IResponse>;
  getDocsByParamRT(
    col: string,
    field: string,
    condition: WhereFilterOp,
    param: string,
    callBack: Function
  ): Promise<Unsubscribe | IResponse>;
  arrayContainsAny(
    col: string,
    field: string,
    array: Array<any>
  ): Promise<IResponse>;
  arrayContains(col: string, field: string, value: any): Promise<IResponse>;
  getMultipleCol(arrayCollections: Array<string>): Promise<IResponse>;
}