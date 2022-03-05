import { StorageReference } from "firebase/storage";
import { FirebaseApp } from "firebase/app";
import { StorageFunctions } from '../interfaces/IStorage';
export declare class Storage implements StorageFunctions {
    private storage;
    constructor(app: FirebaseApp);
    uploadFile(reference: StorageReference, file: File, callback: Function): Promise<void>;
    deleteFile(fileRef: string, callback?: Function): Promise<void>;
    getAllFiles(reference: string, callback: Function): void;
}
