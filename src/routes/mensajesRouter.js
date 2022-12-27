//CRUD --> con métodos (post, get..)

import { Router } from "express";
import MensajesModel from '../models/MensajesModel.js';

const mensajesRouter = new Router();
const mensajesModel = new MensajesModel();

//CREATE --> POST
mensajesRouter.post('/', async (req, res) => {
    try {
        const mensaje = req.body;
        const ids = await mensajesModel.save(mensaje);
        res.json(ids);
    } catch (error) {
        res.send('Error al crear mensaje')
    }
})

//READ --> GET 
mensajesRouter.get('/', async (req, res) => {
    try {
        const mensajes = await mensajesModel.getAll();
        res.json(mensajes);
    } catch (error) {
        res.send('Error al mostrar los mensajes')
    }
})

mensajesRouter.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mensaje = await mensajesModel.getById(id);
        res.json(mensaje);
    } catch (error) {
        res.send('Error al mostrar el mensaje')
    }
})

//U --> PUT
mensajesRouter.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const mensaje = req.body;
        const idUp = await mensajesModel.updateById(id, mensaje);
        res.json(idUp)
    } catch (error) {
        res.send('Error al modificar el mensaje')
    }
})

//DELETE --> DELETE
mensajesRouter.delete('/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        await mensajesModel.deleteById(id)
        res.send('Mensaje eliminado correctamente')
    } catch (error) {
        res.send('No se pudo eliminar el mensaje')
    }
})

export default mensajesRouter