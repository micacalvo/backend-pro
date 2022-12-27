//CRUD --> con métodos (post, get..)

import { Router } from "express";
import ProductosModel from '../models/ProductosModel.js';

const productosRouter = new Router();
const productosModel = new ProductosModel();

//CREATE --> POST
productosRouter.post('/', async (req, res) => {
    try {
        const producto = req.body;
        const ids = await productosModel.save(producto);
        res.json(ids);
    } catch (error) {
        res.send('Error al crear producto')
    }
})

//READ --> GET 
productosRouter.get('/', async (req, res) => {
    try {
        const productos = await productosModel.getAll();
        res.json(productos);
    } catch (error) {
        res.send('Error al mostrar los productos')
    }
})

productosRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productos = await productosModel.getById(id);
        res.json(productos);
    } catch (error) {
        res.send('Error al mostrar el producto')
    }
})

//U --> PUT
productosRouter.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producto = req.body;
        const idUp = await productosModel.updateById(id, producto);
        res.json(idUp)
    } catch (error) {
        res.send('Error al modificar producto')
    }
})

//DELETE --> DELETE
productosRouter.delete('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productosModel.deleteById(id)
        res.send('Producto eliminado correctamente')
    } catch (error) {
        res.send('No se pudo eliminar el producto')
    }
})

export default productosRouter