//Importo la clase
const ClaseContendora = require("./Container/clase-contenedora")
//Importo los productos
const productos = new ClaseContendora("./productos.json")

//Creación de mis productos, dentro de una función
async function misProductos () {
    const ropa1 = {
        name: "Wide Leg",
        price: 2000,
        color: "black"
    }
    const ropa2 = {
        name: "Camisa leñador",
        price: 5000,
        color: "white"
    }
    const ropa3 = {
        name: "Vestido fiesta",
        price: 6000,
        color: "red"
    }

   //await productos.getAll().then(data => (console.log(data))) 
   await productos.deleteAll()
   await productos.save(ropa1)
   await productos.save(ropa2)
   await productos.save(ropa3)
   //await productos.getById(2).then(data => console.log(data))
   await productos.deleteById(2)
}
misProductos()