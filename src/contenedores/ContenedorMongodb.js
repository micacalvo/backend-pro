import mongoose from "mongoose";
import { asPOJO, removeField, renameField } from "../utils/objectUtils.js";

//Configuración 
const URL = 'mongodb://localhost:27017/dbmica'

mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
console.log('Base de datos conectada');

class ContenedorMongodb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
};
        
    async save(nuevoElem) {
       try {
        const data = await this.coleccion.create(nuevoElem);
        data = asPOJO(data)
        renameField(data, '_id', 'id')
        removeField(data, '__v')
        return data
       } catch (error) {
        console.log('No se puede agregar el producto')
       } 
    }

    async getAll() {
        try {
            let data = await this.coleccion.find({}).lean()
            data = data.map(d => renameField(d, '_id', 'id'))
            return data
        } catch (error) {
            throw new Error(`No se pueden mostrar los productos`)
        }
    }

    async getById(id) {
        
    }


    async updateById(nuevoElem) {
        
    }

    async deleteById(id) {
        
    }

    async borrarAll() {
        
    }
}

export default ContenedorMongodb
