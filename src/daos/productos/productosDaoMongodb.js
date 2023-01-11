import ContenedorMongodb from '../../contenedores/ContenedorMongodb.js';

//Esquema
class ProductosDaoMongodb extends ContenedorMongodb {

    constructor() {
        super('productos', {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            stock: {type: Number, required: true},
            description: {type: String, required: true},
            thumbnail: { type: String, required: true },
        })
    }
}

export default ProductosDaoMongodb
