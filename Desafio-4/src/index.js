const express = require("express")
//Traigo a Router de express
const router = require("./router")

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Levanto el archivo html
app.use(express.static("Public"))

//Configuro servidor
app.use("/api", router)

const server = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor: ${error}`))
