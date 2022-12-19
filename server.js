// Configuración del servidor
const express = require ('express')
const cartRouter = require("./routes/cartRouter.Router")
const productsRouter = require("./routes/productsRouter.Router")
const products = require("./container/products.json")
const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//Enrutador- Rutas bases
app.use('/api/productos', productsRouter)
app.use('/api/cart', cartRouter)
app.get('*', function(req, res){
    res.send({status: "error", description: `ruta ${req.url} metodo ${req.method} No implementada`})
})

//Configuración de puerto
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})

server.on("error", error => console.log("Error en servidor"))
