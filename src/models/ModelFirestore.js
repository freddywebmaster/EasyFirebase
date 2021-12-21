class ModelFirestore {
    /**
     * the constructor method have 2 parameters
     * the reference of the collection to be saved in firestore
     * and the class instance firestore coming from the user configuration
     */
    constructor(firestore) {
        this.collection = '';
        this.firestore = firestore;
    }

    /**
     * this method set the collection indicated in the user's model
     */
    setCollection(collection) {
        this.collection = collection;
    }

    /**
     * this method set the firestore instance in the user configuration
     */
    setFirestore(firestore) {
        this.firestore = firestore
    }

    /**
     * saves data to the collection indicated in the user's model
     */
    async save(data) {
        const doc = await this.firestore.addDoc(this.collection, data);
        return doc;
    }

    /**
     * Update data to the collection indicated in the user's model
     */
    async update(id, data){
        const doc = await this.firestore.updateDoc(this.collection, id, data);
        return doc;
    }

    /**
     * get data of doc in the collection indicated in the user's model
     */
    async findOne(id){
        const doc = await this.firestore.getDocById(this.collection, id);
        return doc;
    }

}

export default ModelFirestore;