import { StorageReference } from "firebase/storage";
import { FirebaseApp } from "firebase/app";
export declare class Storage {
    private storage;
    lastUpload: string | null;
    constructor(app: FirebaseApp);
    uploadFile(reference: StorageReference, file: File, callback: Function): Promise<void>;
    deleteFile(fileRef: string, callback?: Function): Promise<void>;
    getAllFiles(reference: string, callback: Function): void;
}
