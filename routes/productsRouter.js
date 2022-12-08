const express = require ('express')

const { Router } = express;
const productsRouter = new Router()

//Configuracion para traer archivos
const Container = require('../container/ContainerProducts')
const products = new Container('../container/products.json')

//Middleware
function mdl1(req, res, next) {
    if (req.query.rol !== "admin") {
        res.status(500).send("Usuario no autorizado")
    }
    next()
}
 
//ruta de productos y metodos
productsRouter.get('/productos', (req, res)=>{
    products.getAll().then(products => {
        res.render('main', {products})
    })
})

productsRouter.get('/productos/:id', (req, res)=>{
    let {id} = req.params
    id = parseInt(id)
    products.getById(id).then(prod =>{
        res.json(prod)
    })
})

productsRouter.post('/productos', mdl1, (req, res)=>{
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
    
productsRouter.put('/productos/:id', mdl1, (req, res)=>{
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

productsRouter.delete('/productos', mdl1, (req, res)=>{
    products.deleteAll()
})
    
productsRouter.delete('/productos/:id', mdl1, (req, res)=>{
    let {id} = req.params
    products.deleteById(id)
})

module.exports = productsRouter