import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";

//Esquema
class CarritosDaoMongodb extends ContenedorMongodb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongodb