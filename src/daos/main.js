let productosDao
let carritosDao

switch ('mongodb') {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':

        break
    case 'mongodb':
        const { default: ProductosDaoMongodb } = await import('./productos/productosDaoMongodb.js')
        const { default: CarritoDaoMongodb } = await import('./carrito/carritoDaoMongodb.js')

        productosDao = new ProductosDaoMongodb()
        carritosDao = new CarritoDaoMongodb()

        break
    case 'mariadb':

        break
    case 'sqlite3':

        break
    default:

        break
}

export { productosDao, carritosDao }