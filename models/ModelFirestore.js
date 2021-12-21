class ModelFirestore {
    constructor(firestore) {
        this.collection = '';
        this.firestore = firestore;
    }

    setCollection(collection) {
        this.collection = collection;
    }

    setFirestore(firestore) {
        this.firestore = firestore
    }

    async save(data) {
        const doc = await this.firestore.addDoc(this.collection, data);
        return doc;
    }

    async update(id, data){
        const doc = await this.firestore.updateDoc(this.collection, id, data);
        return doc;
    }

    async findOne(id){
        const doc = await this.firestore.getDocById(this.collection, id);
        return doc;
    }

}

export default ModelFirestore;