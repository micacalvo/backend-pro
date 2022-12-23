import express from 'express';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
import ContainerSql from './container/ContainerSql.js';
import configClient from './configClient.js';

const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

const productos = new ContainerSql(configClient.mariaDb, 'productos')
const mensajes = new ContainerSql(configClient.sqlite3, 'mensajes')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

const PORT = 8040
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))




