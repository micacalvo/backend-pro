//Lado del servidor
const express = require("express")
const {router} = require("../routes/router")
const {Server: HTTPServer} = require("http")
const {Server: IOServer} = require("socket.io")
const productos = require("../container/productos.json")
const mensajes = require("../container/mensajes.json")

const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

//Implementación y configuración de socket
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    //Envio historial cuando se conecte un nuevo cliente
    socket.emit('productos', productos)
    socket.emit('mensajes', mensajes)

    //Escucho al cliente
    socket.on('new-message', data => {
        mensajes.push(data)
        
    //Emit a todos los clientes (por medio de broadcast)
    io.sockets.emit('mensajes', mensajes)
    })

    socket.on('new-product', info => {
        productos.push(info)

        io.sockets.emit('productos', productos)
    })
})

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))
