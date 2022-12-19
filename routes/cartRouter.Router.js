const express = require ('express')

const { Router } = express
const cartRouter = new Router()

//Configuración para traer archivos 
const ContainerCart = require('../container/ContainerCart')
const cart = new ContainerCart('../container/cart.json')

//Endpoints
//Obtiene todos los carritos
cartRouter.get('/', async (req, res)=>{
    cart.getAll().then(cart => {        
        res.json(cart)
    })
})

//Obtiene el carrito por su id y los productos guardados en el 
cartRouter.get('/:id', async (req, res)=>{
    let {id} = req.params
    cart.getById(id).then(cart => {            
        res.json(cart)
    })
})

//Crea un carrito y devuelve su id
cartRouter.post('/', (req, res)=>{
    cart.saveObj().then(cart => {
        res.json(cart)
    })
    
})

//Introduce un producto al carrito por el id del producto 
cartRouter.post('/:id', (req, res)=>{
    let {id, idProduct} = req.params
    id= parseInt(id)
    idProduct = parseInt(idProduct)                                 
    cart.getById(idProduct).then(prod =>{
        cart.saveObj(id, prod).then(() =>{
            res.json(`Se agrego el producto correctamente`)
        })
    })
})

//Elimina un carrito por su id
cartRouter.delete('/:id', (req, res)=>{
    let {id} = req.params
    id= parseInt(id)
    cart.deleteCart(id).then(()=>{
        res.json("Se elimino el carrito")
    })
})

//Elimina un producto de un carrito por su id
cartRouter.delete('/:idProduct', (req, res)=>{
    let {id, idProduct} = req.params
    id= parseInt(id)
    idProduct = parseInt(idProduct)
    cart.deleteObj(id, idProduct).then(() =>{
        res.json(`Se elimino el producto correctamente`)
    })
})

module.exports = cartRouter