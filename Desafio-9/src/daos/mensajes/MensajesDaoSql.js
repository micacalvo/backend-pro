import ContenedorSql from '../../contenedores/ContenedorSql.js';

class MensajesDaoSql extends ContenedorSql {
    constructor(){
        super(configClient.mysql, configClient.sqlite3, 'mensajes')
    }
}

export default MensajesDaoSql;