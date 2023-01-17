import ContenedorFirebase from "../../contenedores/ContenedorFirebase";

class CarritosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('carritos')
    }
    async save(carrito = {productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaoFirebase