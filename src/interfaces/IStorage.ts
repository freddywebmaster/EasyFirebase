import { StorageReference } from "firebase/storage";

export interface StorageFunctions {
  uploadFile(reference: StorageReference, file: File, callback: Function): void;
  deleteFile(fileRef: string, callback?: Function): void;
  getAllFiles(reference: string, callback: Function): void;
}