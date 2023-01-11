import express from 'express';
import { Router } from "express";

import {
    productosDao as productosApi,
    carritosDao as carritosApi 
} from '../src/daos/main.js';

const app = express()

//Router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    try {
        const productos = await productosApi.getAll();
        res.json(productos);
    } catch (error) {
        res.send('Error al mostrar los productos')
    }
})

productosRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productos = await productosApi.getById(id);
        res.json(productos);
    } catch (error) {
        res.send('Error al mostrar el producto')
    }
})

productosRouter.post('/', async (req, res) => {
    try {
        const producto = req.body;
        const ids = await productosApi.save(producto);
        res.json(ids);
    } catch (error) {
        res.send('Error al crear producto')
    }
})

productosRouter.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producto = req.body;
        const idUp = await productosApi.updateById(id, producto);
        res.json(idUp)
    } catch (error) {
        res.send('Error al modificar producto')
    }
})

productosRouter.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productosApi.deleteById(id)
        res.send('Producto eliminado correctamente')
    } catch (error) {
        res.send('No se pudo eliminar el producto')
    }
})

// Router de carritos

const carritosRouter = new Router()

//Obtiene todos los carritos
carritosRouter.get('/', async (req, res)=>{
    carritosApi.getAll().then(cart => {        
        res.json(cart)
    })
})

//Crea un carrito y devuelve su id
carritosRouter.post('/', (req, res)=>{
    carritosApi.save().then(cart => {
        res.json(cart)
    })
})

//Elimina un carrito por su id
carritosRouter.delete('/:id', (req, res)=>{
    let {id} = req.params
    id= parseInt(id)
    carritosApi.deleteById(id).then(()=>{
        res.json("Se elimino el carrito")
    })
})

// Router de productos en carrito

//Obtiene el carrito por su id y los productos guardados en el 
carritosRouter.get('/:id', async (req, res)=>{
    let {id} = req.params
    carritosApi.getById(id).then(cart => {            
        res.json(cart)
    })
})

//Elimina un producto de un carrito por su id
carritosRouter.delete('/:id/:idProd', (req, res)=>{
    let {id, idProduct} = req.params
    id= parseInt(id)
    idProduct = parseInt(idProduct)
    carritosApi.deleteById(id, idProduct).then(() =>{
        res.json(`Se elimino el producto correctamente`)
    })
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))




