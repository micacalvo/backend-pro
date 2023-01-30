/* import { Router } from 'express'
import { combinacionesRandom} from '../../faker/productos.js'

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productosRandom = []
    for (let i = 0; i < 5; i++) {
        productosRandom.push(combinacionesRandom())
    }
    res.json(productosRandom)
    // const productos = await productosApi.listarAll()
    // res.json(productos)
})

export default productosRouter

 */