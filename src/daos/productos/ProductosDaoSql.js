import ContenedorSql from '../../contenedores/ContenedorSql.js';

class ProductosDaoSql extends ContenedorSql {
    constructor(){
        super(configClient.mysql, configClient.sqlite3, 'productos')
    }
}

export default ProductosDaoSql;