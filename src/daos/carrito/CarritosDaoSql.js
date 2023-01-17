import ContenedorSql from '../../contenedores/ContenedorSql.js';

class CarritosDaoSql extends ContenedorSql {
    constructor(){
        super(configClient.mysql, configClient.sqlite3, 'carritos')
    }
}

export default CarritosDaoSql;