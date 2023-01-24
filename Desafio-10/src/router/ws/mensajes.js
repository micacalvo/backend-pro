import ContenedorMemoria from './contenedores/ContenedorMemoria.js';
const ArchivoMensajes = new ContenedorMemoria("mensajes")

// Importo el DAOS
import {
    mensajesDao as mensajesApi
} from '../../daos/main'

//Mensajes 

// Creo funcion para listar los mensajes normalizados utilizando los metodos del contenedor 
async function listarMensajes() {
    const archivoMensajes = await mensajesApi.getAll()
    const normalizados = normalizarMensajes(archivoMensajes)
    print(normalizados)
    return normalizados
}

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
// Re enviamos por medio broadcast los msn a todos los clientes que esten conectados en ese momento
})
