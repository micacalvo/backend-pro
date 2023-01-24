let productosDao
let mensajesDao

switch ('mongodb') {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: mensajesDaoArchivo } = await import('./mensajes/mensajesDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        mensajesDao = new mensajesDaoArchivo()
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: mensajesDaoFirebase } = await import('./mensajes/mensajesDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        mensajesDao = new mensajesDaoFirebase()

        break
    case 'mongodb':
        const { default: ProductosDaoMongodb } = await import('./productos/ProductosDaoMongodb.js')
        const { default: mensajesDaoMongodb } = await import('./mensajes/mensajesDaoMongodb.js')

        productosDao = new ProductosDaoMongodb()
        mensajesDao = new mensajesDaoMongodb()

        break
    case 'mariadb':
        const { default: ProductosDaoSql } = await import('./productos/ProductosDaoSql.js')
        const { default: mensajesDaoSql } = await import('./mensajes/mensajesDaoSql.js')

        productosDao = new ProductosDaoSql()
        mensajesDao = new mensajesDaoSql()
        break
    /* case 'sqlite3':
        const { default: ProductosDaoSql } = await import('./productos/ProductosDaoSql.js')
        const { default: mensajesDaoSql } = await import('./mensajes/mensajesDaoSql.js')

        productosDao = new ProductosDaoSql()
        mensajesDao = new mensajesDaoSql()
        
        break */
}

export { productosDao, mensajesDao }