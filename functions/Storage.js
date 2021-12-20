import { storage } from './config';

class Storage{
    constructor(){
        this.lastFileUpload = null
    }
    async uploadImage(reference, image){
        if(image === null || image === undefined) return console.log({error: 'falta agregar imagen'});
        try {
            const newRef = storage.ref(reference).child(image.name); // nombre del archivo
            await newRef.put(image);
            let urlImagen = await newRef.getDownloadURL()
            this.lastFileUpload = {
                name: image.name,
                url: urlImagen
            };
            return;
        } catch (error) {
            console.log(error);
        }
    };
}

const storageclass = new Storage();

export default storageclass;