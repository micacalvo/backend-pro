// Importo Express y la clase contenedora
const { response } = require("express")
const express = require ("express")
const classContainer = require("./Container/clase-contenedora")

const app = express()
const PORT = process.env.PORT || 8080

//Llamo a clase Contenedora
const archivo = new classContainer("./productos.json")

//Hago los métodos y configuro los endpoints 
app.get("/productos", async (req, res) => {
const products = await archivo.getAll()
res.send({Productos: products})
})

app.get("/productosRandom", async (req, res) => {
    const products = await archivo.getAll()  
    const prodRandom = parseInt(Math.random() * products.length)
res.send({Productos: products[prodRandom]})
})
    
//Configuro el puerto con el servidor 
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto: ${PORT}`)
});

//En caso de error
server.on ("error", error => console.log(`Error en server: ${error}`))