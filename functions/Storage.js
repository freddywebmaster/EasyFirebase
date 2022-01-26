import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
  } from "firebase/storage";
  
  class Storage {
    constructor(app) {
      this.storage = getStorage(app);
      this.porcent = 0;
      this.lastUpload = null;
      this.loading = false;
    }
  
    async uploadFile(reference, file, callback) {
      //
      if (!file) return;
      this.loading = true;
      const refImg = ref(this.storage, `${reference}/${file.name}`);
      const uploadTask = uploadBytesResumable(refImg, file);
  
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.porcent = prog;
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            callback(downloadURL, `${reference}/${file.name}`);
          });
        }
      );
      this.loading = false;
    }
  }
  
  export default Storage;  