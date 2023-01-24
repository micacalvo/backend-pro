import ContenedorFirebase from "../../contenedores/ContenedorFirebase";

class ProductosDaoFirebase extends ContenedorFirebase{
    constructor() {
        super('productos')
    }
}

export default ProductosDaoFirebase;