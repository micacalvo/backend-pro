import mongoose, { model } from "mongoose";

const URL = 'mongodb://localhost:27017/dbmica';

mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}) 
console.log('Base de datos conectada');

class ContenedorMongodb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
        
    async save(productos) {
       try {
        const nuevoProd = await model.this.coleccion.insertOne({
            producto: "Medias", precio: 568, Stock: 0
        });
        const prodSave = await nuevoProd.save();
        console.log(prodSave)
       } catch (error) {
        console.log('No se puedn agregar los productos')
       } 
    }

    async getAll() {
        try {
            const data = await model.this.coleccion.find({})
            return data
        } catch (error) {
            throw new Error(`No se pueden mostrar los productos`)
        }
    }

    async getById(id) {
        const data = await model.this.coleccion.find({_id:"63ab667112811c07061a31e7"})
        return data
    }

    async updateById(nuevoElem) {
        try {
            const updateProd = await model.this.coleccion.updateOne({producto: "Musculosa Algodon"}, {$set:{precio: 2000}})
            return (updateProd)
        } catch(error) {
            throw new Error(`No se puede actualizar el producto`)
        }
    }

    async deleteById(id) {
        try {
            const data = await model.this.coleccion.deleteOne({_id:"63ab667112811c07061a31e7"})
            return data   
        } catch (error) {
            throw new Error(`No se puede eliminar el producto`)
        }
    }

    async borrarAll() {
    try {
        const data = await model.this.coleccion.deleteMany({})
            return data    
    } catch (error) {
        throw new Error(`No se pueden eliminar los producto`)
    }
}
}

export default ContenedorMongodb