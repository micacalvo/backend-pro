import mongoose from "mongoose";

const URL = 'mongodb://127.0.0.1:27017/dbmica';

mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);
console.log('Base de datos conectada');

class ContenedorMongodb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
        
    async save(producto) {
       try {
        const prod = new this.coleccion(producto)
        const prodSave = await prod.save();
        return prodSave
       } catch (error) {
        console.log('No se pueden agregar los productos')
       } 
    }

    async getAll() {
        try {
            const data = await this.coleccion.find({})
            return data
        } catch (error) {
            console.log('No se pueden mostrar los productos')
        }
    }

    async getById(id) {
       try {
        const data = await this.coleccion.find({'_id': id})
        if(data){
            return data
        } else {
            return ('No se encontro el producto')
        }
    } catch(error) {
        console.log(error)
    }
}

    async updateById(id, item) {
        try {
            const updateProd = await this.coleccion.updateOne({_id: id}, {$set: item})
            return (updateProd)
        } catch(error) {
            console.log('No se puede actualizar el producto')
        }
    }

    async deleteById(id) {
        try {
            const deletedProd = await this.coleccion.deleteOne({_id:id})
            return deletedProd   
        } catch (error) {
            console.log('No se puede eliminar el producto')
        }
    }

    async deleteAll() {
    try {
        const data = await this.coleccion.deleteMany({})
            return data    
    } catch (error) {
        console.log('No se pueden eliminar los productos')
    }
}
}

export default ContenedorMongodb