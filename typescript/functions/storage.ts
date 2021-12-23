class Storage{
    lastFileUpload: any;
    storage: any;
    constructor(storageConfig: any){
        this.lastFileUpload = null;
        this.storage = storageConfig;
    }
    async uploadImage(reference: string, image: any){
        if(image === null || image === undefined) return console.log({error: 'image missing'});
        try {
            const newRef = this.storage.ref(reference).child(image.name);
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

export default Storage;