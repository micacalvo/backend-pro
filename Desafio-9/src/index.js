import express from 'express';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
import {Router} from 'express';
import ContenedorArchivo from './contenedores/ContenedorArchivo.js';
import ContenedorMemoria from './contenedores/ContenedorMemoria.js';

//Faker
import faker from 'faker';
faker.locale ='es';

//Normalizr
import { normalize, schema} from 'normalizr';
import util from 'util';
function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

//Definimos un esquemas de autores
const authorSchema = new schema.Entity('authors',{}, {idAttribute:"name"});
const textSchema = new schema.Entity('text');
const mensajeSchema = new schema.Entity('mensajes', {
    author: authorSchema,
    text: [textSchema]
});

// Creo funcion para listar los mensajes normalizados utilizando los metodos del contenedor 
async function listarMensajes() {
   const archivoMensajes = await mensajesApi.getAll()
   const normalizados = normalizarMensajes(archivoMensajes)
   print(normalizados)
   return normalizados
}
const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, [mensajeSchema])

// Importo el DAOS
import {
   productosDao as productosApi,
   mensajesDao as mensajesApi
} from './daos/main.js'

//Instancio servidor, socket, Api
const app = express()
const ArchivoProductos = new ContenedorArchivo("productos")
const ArchivoMensajes = new ContenedorMemoria("mensajes")

//Configuro el socket
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

//Mensajes 
//Utilizamos esta funcion para enviar los mensajes normalizados 
listarMensajes()
.then((mensajes)=>{
    socket.emit('mensajes', mensajes)
})   

// Una vez escuchamos al cliente y recibimos un mensaje, realizamos el envio a todos los demas pusheandolo a un array
socket.on('newMensaje', async (data) => {
    await mensajesApi.save(data);
    listarMensajes()
    .then((res)=>{
        io.sockets.emit('mensajes',res)})
// re enviamos por medio broadcast los msn a todos los clientes que esten conectados en ese momento
})

// Productos
    const productos = await ArchivoProductos.getAll();
    // Le envio el historial de el array que ya tengo cuando un nuevo cliente se conecte
    socket.emit('Productos', productos)

    socket.on('newProducto', async (data) => {
        await ArchivoProductos.save(data);
        const newProductos = await ArchivoProductos.getAll();
        io.sockets.emit("Productos", newProductos);
})
})

//Middlewares
const productosRouter = new Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/productos-test', productosRouter)

//Servidor
const PORT = process.env.PORT || 8050
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))

// Inicio faker

function combinacionesRandom() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

productosRouter.get('/', async (req, res) => {
    const productosRandom = []
    for (let i = 0; i < 5; i++) {
        productosRandom.push(combinacionesRandom())
    }
    res.json(productosRandom)
    // const productos = await productosApi.listarAll()
    // res.json(productos)
})


