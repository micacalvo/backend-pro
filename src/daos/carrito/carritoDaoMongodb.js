import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";

//Esquema
class CarritoDaoMongodb extends ContenedorMongodb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritoDaoMongodb