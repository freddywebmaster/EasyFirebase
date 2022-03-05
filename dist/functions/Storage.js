"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const storage_1 = require("firebase/storage");
class Storage {
    constructor(app) {
        this.storage = (0, storage_1.getStorage)(app);
    }
    async uploadFile(reference, file, callback) {
        if (!file)
            return;
        const refImg = (0, storage_1.ref)(this.storage, `${reference}/${file.name}`);
        const uploadTask = (0, storage_1.uploadBytesResumable)(refImg, file);
        await uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, (error) => console.log(error), () => {
            (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then((downloadURL) => {
                callback(downloadURL, `${reference}/${file.name}`, file);
            });
        });
    }
    async deleteFile(fileRef, callback) {
        try {
            const reference = (0, storage_1.ref)(this.storage, fileRef);
            (0, storage_1.deleteObject)(reference)
                .then(() => {
                // File deleted successfully
                if (callback)
                    callback();
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    getAllFiles(reference, callback) {
        const refFull = (0, storage_1.ref)(this.storage, reference);
        const folders = [];
        const images = [];
        (0, storage_1.listAll)(refFull)
            .then((res) => {
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
                folders.push(folderRef);
            });
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                images.push(itemRef);
            });
        })
            .catch((error) => {
            console.log(error);
        });
        if (callback)
            callback(folders, images);
    }
}
exports.Storage = Storage;
