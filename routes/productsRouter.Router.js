const express = require ('express')

const { Router } = express;
const productsRouter = new Router()

//Configuracion para traer archivos
const ContainerProducts = require('../container/ContainerProducts')
const products = new ContainerProducts('../container/products.json')

//Funcion Error
function errorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' No autorizado`
    } else {
        error.descripcion = 'No autorizado'
    }
    return error
}

//Middleware para autorización de admin
const esAdm = true
function soloAdmin(req, res, next) {
    if (!esAdm) {
        res.json(errorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}

//Endpoints
productsRouter.get('/', async (req, res)=>{
    products.getAll().then(products => {
        res.json(products)
    })
})

productsRouter.get('/:id', async (req, res)=>{
    let {id} = req.params
    id = parseInt(id)
    products.getById(id).then(prod =>{
        res.json(prod)
    })
})

productsRouter.post('/', soloAdmin, async(req, res)=>{
    products.save().then(products => {
        res.json(products)
    })
})
    
productsRouter.put('/:id', soloAdmin, async(req, res)=>{
    let { name, price, stock, description, thumbnail } = req.body
    let { id } = req.params
    id = parseInt(id)
    let producto = { name: name, price: price, stock: stock, description: description, thumbnail: thumbnail}

    products.getAll().then(updateProduct => {
    let obj = updateProduct.find(obj => obj.id === parseInt(id))
    let index = updateProduct.indexOf(obj)
    let productUpdate = {...producto, id}
        if (!obj) {
        res.json({msg: "No se encontro el producto"})
        } else{
            products.remplace(productUpdate, index)
            res.json({msg: "Producto modificado"})
        }
    })
})
    
productsRouter.delete('/:id', soloAdmin, async(req, res)=>{
    let {id} = req.params
    products.deleteById(id)
})

module.exports = productsRouter