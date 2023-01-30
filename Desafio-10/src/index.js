import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path'; //Para poder usar los archivos de las vistas, accede a las rutas absolutas
import dotenv from 'dotenv';

dotenv.config();

//Instancio servidor
const app = express()

//Configuro el socket
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

//Middlewares
app.use(express.json()) //Porque trabajo con formularios
app.use(express.urlencoded({extended: true})) //Para postman
//app.use(express.static('public'))
app.use(session({
    store: MongoStore.create({mongoUrl: 'mongodb://0.0.0.0:27017/dbmica'}),
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 50000
    }
}))

//Motor de plantillas 
app.set('views', 'src/views');
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Session
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000 //20sg
    }
}))

//Base de datos
const usuariosDB = []

app.get('/', (req, res) => {
    res.redirect('login')
})

app.get('/login', (req, res) => {
    res.render('login.hbs')
})

app.get('/register', (req, res) => {
    res.render('registro.hbs')
})

//Post para capturar los datos del formulario 
app.post('/login', (req, res) => {
    const { nombre, password } = req.body

//Busco si el usuario ya existe
    const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if (!existeUsuario) { //Si no existe, lo envio a login error
        res.render('login-error.hbs')
    } else { //Si existe, le creo la sesion y le permito el ingreso
        req.session.nombre = nombre;
        req.session.contador = 0
        res.redirect('/datos')
    }
})

//Est get es para obtener los datos del usuario, para saber si existe o no
app.get('/datos', (req, res) => {
    if (req.session.nombre) {
        req.session.contador++

        //Busqueda en la base de datos
        const datosUsuario = usuariosDB.find(usuario => {
            return usuario.nombre == req.session.nombre
        })
        
        //Le envio esta info a la plantilla datos
        res.render('datos', {
            datos: datosUsuario,
            contador: req.session.contador
        })
    } else { //Cuando no hay sesion activa lo redirecciono al login
        res.redirect('/login')
    }
})

//Este post para dar de alta al usuario
app.post('/register', (req, res) => {
    const { nombre, password, direccion } = req.body;

    const usuario = usuariosDB.find(usr => usr.nombre == nombre)

    if (usuario) {
        res.render('registro-error.hbs') //Cuando el usuario ya existe
    } else { //Si no existe, lo agrego a la base de datos y ademas lo envio al login para que se pueda loguear
        usuariosDB.push({ nombre, password, direccion })
        res.render('login.hbs')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.send('Logout ok')
        }
    })
})

//Función de autenticación
function auth(req, res, next) {
    if (req.session?.nombre === nombre && req.session?.admin) {
        return next()
    }
    return res.status(401).send('Error de autenticacion')
}

app.get('/private', auth, (req, res) => {
    res.send('Si estas viendo esta pagina estas logueado y sos Admin')
})

//Servidor
const PORT = process.env.PORT
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))



