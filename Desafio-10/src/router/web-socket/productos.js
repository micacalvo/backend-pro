import ContenedorArchivo from './contenedores/ContenedorArchivo.js';
const ArchivoProductos = new ContenedorArchivo("productos")

// Importo el DAOS
import {
    productosDao as productosApi,
 } from '../../daos/main.js'

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

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
