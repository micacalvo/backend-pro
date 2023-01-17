let productosDao
let carritosDao

switch ('mongodb') {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carrito/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carrito/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()

        break
    case 'mongodb':
        const { default: ProductosDaoMongodb } = await import('./productos/ProductosDaoMongodb.js')
        const { default: CarritosDaoMongodb } = await import('./carrito/CarritosDaoMongodb.js')

        productosDao = new ProductosDaoMongodb()
        carritosDao = new CarritosDaoMongodb()

        break
    case 'mariadb':
        const { default: ProductosDaoSql } = await import('./productos/ProductosDaoSql.js')
        const { default: CarritosDaoSql } = await import('./carrito/CarritosDaoSql.js')

        productosDao = new ProductosDaoSql()
        carritosDao = new CarritosDaoSql()
        break
    /* case 'sqlite3':
        const { default: ProductosDaoSql } = await import('./productos/ProductosDaoSql.js')
        const { default: CarritosDaoSql } = await import('./carrito/CarritosDaoSql.js')

        productosDao = new ProductosDaoSql()
        carritosDao = new CarritosDaoSql()
        
        break */
}

export { productosDao, carritosDao }