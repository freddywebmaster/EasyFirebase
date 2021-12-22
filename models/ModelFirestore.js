import { GET_TYPE, VALIDATE_TYPE } from '../utils/validateType'

class ModelFirestore {

    constructor(model, firestore) {
        this.collection = model.collection;
        this.initialState = model.initialState;
        this.firestore = firestore;
    }

    async save(data) {
        const doc = await this.firestore.addDoc(this.collection, data);
        return doc;
    }

    validateSave(obj) {

        const values = Object.values(this.initialState);
        const keys = Object.keys(this.initialState);
        const result = [];

        values.map((val, i)=>{
            result.push({key: keys[i], type: GET_TYPE(val)})
        });
    }

}

export default ModelFirestore;