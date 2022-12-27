import express from 'express';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
import productosRouter from './routes/productosRouter.js';
import mensajesRouter from './routes/mensajesRouter.js';

const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productosRouter);
app.use('/api/mensajes', mensajesRouter);

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))




