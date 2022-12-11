//Prueba git 
// Configuración del servidor
const express = require ('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Motor de plantilla
app.set('view engine', 'ejs')
app.set('views', './views')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//Traigo archivos
const ContainerProducts = require('./container/ContainerProducts.js')
const ContainerCart = require('./container/ContainerCart.js')
const products = new ContainerProducts('./container/products.json')
const messages = new ContainerProducts('./container/message.json')
const cart = new ContainerCart('./container/cart.json')

//Configuración de puerto
const PORT = process.env.PORT || 8080

// Funcion Error
function errorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

//Middleware para autorización
const esAdm = true
function mdl1(req, res, next) {
    if (!esAdm) {
        res.json(errorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}

//Conección al server
io.on('connection', socket => {
    console.log(`Nuevo cliente conectado, tu usuario es ${socket.nombre}`)
//emite el array de mensajes
    messages.getAll().then(messages => {
     socket.emit('messages', messages)
    })
//los recibe y los pushea al servidor
    socket.on('message', messagesData =>{
    
    messages.save(messagesData),

    messages.getAll().then(messages => {
        io.sockets.emit('messages', messages)
       })
    })    
})

//enrutador cart
app.get('/cart', async (req, res)=>{//obtiene todos los carritos
    cart.getAll().then(cart => {        
        res.json(cart)
    })
})

app.get('/cart/:id', async (req, res)=>{//obtiene el carrito por su id y los productos guardados en el 
    let {id} = req.params
    cart.getById(id).then(cart => {            
        res.json(cart)
    })
})

app.post('/cart/:usuario', (req, res)=>{//crea un carrito y devuelve su id
    let {usuario} = req.params
    let today = new Date();
    let fecha = today.getDate() + '-' + ( today.getMonth() + 1 ) + '-' +  today.getFullYear()
    let id = Math.random()

    let newCart ={
        id: id,
        usuario: usuario,
        creationFech: fecha,
        cart: []
    }

    cart.postNewCart(newCart).then(cart => {
        res.json(newCart.id)
    })
    
})

app.post('/:id/cart/:idProduct', (req, res)=>{//introduce un producto al carrito por el id del producto (/:id = id del usuario o del carrito /cart/:idProduct = id del producto)
    let {id, idProduct} = req.params
    id= parseInt(id)
    idProduct = parseInt(idProduct)                                 
    products.getById(idProduct).then(prod =>{
        cart.saveObjInCArt(id, prod).then(() =>{
            res.json(`se agrego el producto correctamente`)
        })
    })
})

app.delete('/:id/cart', (req, res)=>{//elimina un carrito por su id
    let {id} = req.params
    id= parseInt(id)
    cart.deleteCart(id).then(()=>{
        res.json("se elimino el carrito")
    })
})

app.delete('/:id/cart/:idProduct', (req, res)=>{//elimina un producto de un carrito por su id
    let {id, idProduct} = req.params
    id= parseInt(id)
    idProduct = parseInt(idProduct)
    cart.deleteObjInCart(id, idProduct).then(() =>{
        res.json(`se elimino el producto correctamente`)
    })
})

//enrutador productos
 app.get('/productos', async(req, res)=>{//obtiene todos los productos
    products.getAll().then(products => {
        res.render('main', {products})
    })
})

app.get('/productos/:id', async (req, res)=>{//obtiene los productos por id
    let {id} = req.params
    id = parseInt(id)
    products.getById(id).then(prod =>{
        res.json(prod)
    })
})

app.post('/productos', mdl1, async (req, res)=>{ //crea los productos
    let { name , price , thumbnail , stock , description } = req.body 
    let id
    products.getAll().then(products => {
        if (products.length == 0) {
            id = 1
        }else{
            id = products.length +1
        }    
    })
    let articulo ={ name : name, price : price, stock: stock, description: description, thumbnail : thumbnail} 
    const newProduct = {...articulo, id}
    products.save(newProduct)
    res.redirect('/productos')
    })
    
app.put('/productos/:id', mdl1, async (req, res)=>{//modifica los productos por su id
    let { name, price, thumbnail } = req.body
    let { id } = req.params
    id = parseInt(id)
    let producto = { name : name, price : price, thumbnail : thumbnail}

    products.getAll().then(newProductModifi=>{
        let obj = newProductModifi.find(obj => obj.id === parseInt(id))
        let index = newProductModifi.indexOf(obj)
        let productModifi = {...producto, id}
        if (!obj) {
            res.json({msg: "no se encontro el producto"})
            }else{
                products.remplace(productModifi, index)
                res.json({msg: "producto modificado con exito"})
            }
         })
    })

app.delete('/productos', mdl1, async (req, res)=>{//elimina todos los productos
    products.deleteAll()
    })
    
app.delete('/productos/:id', mdl1, async (req, res)=>{//elimina los productos por su id
    let {id} = req.params
    products.deleteById(id)
    }) 

const server = httpServer.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})

server.on("error", error => console.log("Error en servidor"))