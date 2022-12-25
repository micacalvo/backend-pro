// CLASE QUE CONTIENE CRUD SQL
import configClient from "../configClient.js";

class ProductosModel {
//C
async save(producto) {
        const ids = await configClient('productos').insert(producto);
        return ids  
}

//R
async getAll() {
    return configClient('productos').select('*').limit(15)
}

async getById(id) {
    return configClient('productos').where("id", id).select('*')
}

//U
async updateById(id, producto) {
    const idUp = await configClient('productos').where("id", id).update(producto)
    return idUp;
}

//D
async deleteById(id) {
    return configClient('productos').where("id", id).del();
}
}

export default ProductosModel;
