import { getFirestore } from 'firebase/firestore';

class EasyModel {

    constructor(model, app) {
        this.collection = model.collection;
        this.initialState = model.initialState;
        this.firestore = getFirestore(app);
    }

    async save(data) {
        const doc = await this.firestore.addDoc(this.collection, data);
        return doc;
    }

    async update(id, data){
        const doc = await this.firestore.updateDoc(this.collection, id, data);
        return doc;
    }

    async delete(id){
        const doc = await this.firestore.deleteDoc(this.collection, id);
        return doc;
    }

    async findAll(){
        const docs = await this.firestore.getAllInCollection(this.collection);
        return docs;
    }

    async findOne(id){
        const doc = await this.firestore.getDocById(id);
        return doc;
    }

    findOneInRealTime(id){
        const result = [];
        await this.firestore.getDocByIdInRealTime(this.collection, id, (doc)=>{
            result.push(doc);
        });
        return result[0];
    }

    findParams(field, param, condition='=='){
        const doc = await this.firestore.getDocsByParam(this.collection, field, condition, param);
        return doc;
    }

    findParamsInRealTime(field, param, condition='=='){
        const result = [];
        await this.firestore.getDocsByParamInRealTime(this.collection, field, param, condition, (doc)=>{
            result.push(doc);
        });
        export default result[0];
    }
}

export default EasyModel;