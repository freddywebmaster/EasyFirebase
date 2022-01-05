import { getStorage } from 'firebase/storage';

class Storage {
    constructor(app) {
        this.lastFileUpload = null;
        this.storage = getStorage(app);
    }
    async fileUpload(reference, file) {
        try {
            const newRef = this.storage.ref(reference).child(file.name + Date.now());
            await newRef.put(file);
            let urlFile = await newRef.getDownloadURL()

            return this.lastFileUpload = {
                name: file.name + Date.now(),
                url: urlFile
            };
        } catch (error) {
            console.log(error);
        }
    };

    // getFiles(reference) {
    //     var listRef = storageRef.child(reference);

    //     // Find all the prefixes and items.
    //     listRef.listAll().then(function (res) {
    //         res.prefixes.forEach(function (folderRef) {
    //             // All the prefixes under listRef.
    //             // You may call listAll() recursively on them.

    //             console.log(folderRef)
    //         });
    //         res.items.forEach(function (itemRef) {
    //             // All the items under listRef.
    //             console.log(itemRef)
    //         });
    //     }).catch(function (error) {
    //         // Uh-oh, an error occurred!
    //         console.log(error)
    //     });
    // }

    // async fileDownload(reference, type = 'path') {

    //     switch (type) {
    //         case 'path':
    //             return pathReference = this.storage.ref(reference);
    //         case 'gs':
    //             return gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')
    //         case 'http':
    //             return httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
    //         default:
    //             return console.log('invalid type')
    //     }

    // }

    // async fileDelete(reference) {
    //     const file = storageRef.child(reference);

    //     // Delete the file
    //     file.delete().then(function () {
    //         // File deleted successfully
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }
}

export default Storage;