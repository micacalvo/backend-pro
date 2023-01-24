import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';

//Instancio servidor
const app = express()

//Configuro el socket
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/dbmica'}),
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 50000
    }
}))

//Servidor
const PORT = process.env.PORT || 8050
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))



