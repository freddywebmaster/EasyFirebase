"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    constructor(storageConfig) {
        this.lastFileUpload = null;
        this.storage = storageConfig;
    }
    uploadImage(reference, image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (image === null || image === undefined)
                return console.log({ error: 'image missing' });
            try {
                const newRef = this.storage.ref(reference).child(image.name);
                yield newRef.put(image);
                let urlImagen = yield newRef.getDownloadURL();
                this.lastFileUpload = {
                    name: image.name,
                    url: urlImagen
                };
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
}
exports.default = Storage;
