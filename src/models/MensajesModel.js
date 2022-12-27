import configClient from "../configClient.js";

class MensajesModel {
//C
async save(mensaje) {
        const ids = await configClient('mensajes').insert(mensaje);
        return ids  
}

//R
async getAll() {
    return configClient('mensajes').select('*').limit(15)
}

async getById(id) {
    return configClient('mensajes').where("id", id).select('*')
}

//U
async updateById(id, mensaje) {
    const idUp = await configClient('mensajes').where("id", id).update(mensaje)
    return idUp;
}

//D
async deleteById(id) {
    return configClient('mensajes').where("id", id).del();
}
}

export default MensajesModel;
