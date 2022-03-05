import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  FirebaseStorage,
  StorageReference,
  deleteObject,
  listAll,
} from "firebase/storage";
import { FirebaseApp } from "firebase/app";
import { StorageFunctions } from '../interfaces/IStorage';

export class Storage implements StorageFunctions {
  private storage: FirebaseStorage;

  constructor(app: FirebaseApp) {
    this.storage = getStorage(app);
  }

  public async uploadFile(
    reference: StorageReference,
    file: File,
    callback: Function
  ) {
    if (!file) return;
    const refImg = ref(this.storage, `${reference}/${file.name}`);
    const uploadTask = uploadBytesResumable(refImg, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL, `${reference}/${file.name}`, file);
        });
      }
    );
  }

  async deleteFile(fileRef: string, callback?: Function) {
    try {
      const reference = ref(this.storage, fileRef);
      deleteObject(reference)
        .then(() => {
          // File deleted successfully
          if (callback) callback();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getAllFiles(reference: string, callback: Function) {
    const refFull = ref(this.storage, reference);

    const folders: any = [];
    const images: any = [];

    listAll(refFull)
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

    if (callback) callback(folders, images);
  }
}