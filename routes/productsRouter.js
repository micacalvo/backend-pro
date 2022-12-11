const express = require ('express')

const { Router } = express;
const productsRouter = new Router()

//Configuracion para traer archivos
const Container = require('../container/ContainerProducts')
const products = new Container('../container/products.json')

// Funcion Error
function errorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}
//Middleware para autorización
const esAdm = true
function mdl1(req, res, next) {
    if (!esAdm) {
        res.json(errorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}

//ruta de productos y metodos
productsRouter.get('/productos', async (req, res)=>{
    products.getAll().then(products => {
        res.render('main', {products})
    })
})

productsRouter.get('/productos/:id', async (req, res)=>{
    let {id} = req.params
    id = parseInt(id)
    products.getById(id).then(prod =>{
        res.json(prod)
    })
})

productsRouter.post('/productos', esAdm, async(req, res)=>{
    let { name, price, thumbnail } = req.body 
    let id
    products.getAll().then(products => {
        if (products.length == 0) {
            id = 1
        }else{
            id = products.length +1
        }    
    })

    let articulo ={ name : name, price : price, thumbnail : thumbnail} 
    const newProduct = {...articulo, id}
    products.save(newProduct)
    res.redirect('/productos')
})
    
productsRouter.put('/productos/:id', esAdm, async(req, res)=>{
    let { name, price, thumbnail } = req.body
    let { id } = req.params
    id = parseInt(id)
    let producto = { name : name, price : price, thumbnail : thumbnail}

    products.getAll().then(newProductModifi=>{
    let obj = newProductModifi.find(obj => obj.id === parseInt(id))
    let index = newProductModifi.indexOf(obj)
    let productModifi = {...producto, id}
    if (!obj) {
        res.json({msg: "No se encontro el producto"})
        }else{
            products.remplace(productModifi, index)
            res.json({msg: "Producto modificado"})
        }
    })
})

productsRouter.delete('/productos', esAdm, async(req, res)=>{
    products.deleteAll()
})
    
productsRouter.delete('/productos/:id', esAdm, async(req, res)=>{
    let {id} = req.params
    products.deleteById(id)
})

module.exports = productsRouter