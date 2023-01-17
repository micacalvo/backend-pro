import ContenedorArchivo from "../../contenedores/ContenedorArchivo";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('carrito.json')
    }
    async save(carrito = {productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaoArchivo;