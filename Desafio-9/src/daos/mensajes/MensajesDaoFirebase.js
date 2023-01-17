import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class MensajesDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('mensajes')
    }
    async save(mensajes = {}) {
        return super.save(mensajes)
    }
}

export default MensajesDaoFirebase