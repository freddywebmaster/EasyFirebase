class ModelFirestore {
    constructor(firestore) {
        this.collection = '';
        this.data = {};
        this.firestore = firestore;
    }

    setDataModel(data) {
        this.data = data;
    }

    setCollection(collection) {
        this.collection = collection;
    }

    setFirestore(firestore) {
        this.firestore = firestore
    }

    async save() {
        const doc = await this.firestore.addDoc(this.collection, this.data);
        return doc;
    }

}

export default ModelFirestore;