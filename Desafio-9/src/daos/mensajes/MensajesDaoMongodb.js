import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js";

//Esquema
class MensajesDaoMongodb extends ContenedorMongodb {

    constructor() {
        super('mensajes', {
            mensajes: { type: [], required: true }
        })
    }

    async guardar(mensajes = {}) {
        return super.guardar(mensajes)
    }
}

export default MensajesDaoMongodb