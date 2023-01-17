import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class MensajesDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('mensajes.json')
    }
    async save(mensajes = {}) {
        return super.save(mensajes)
    }
}

export default MensajesDaoArchivo;