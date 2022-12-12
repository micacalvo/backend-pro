/* const ERROR = { error: "Producto no encontrado" };

class Productos {
    constructor(){
        this.productos = []
}

//Métodos:
getById(req, res) {
    try {
        const {id} = req.params
        const productoId = this.productos.find(producto => producto.id === id)
        if(productoId) {
          return productoId
        } else {
            return ERROR
        }
    } catch (error) {
        console.log("Error en servidor")
    }
}

getAll(req, res) {
    try {
        res.render("productos", {productos: productos, empty: productos.length === 0 ? true : false})
        return this.productos
    } catch (error) {
        console.log(error)
    }
}

cargarNuevo(req, res){
    try {
        const {title, price, thumbnail} = req.body
        const producto = {title: title, price: price, thumbnail: thumbnail}
        const idMax = producto.length === 0 ? 0 : Math.max(...producto);
        const id = idMax + 1
        const newProd = {...id}
        this.productos.push(newProd)
        return newProd
    } catch (error) {
        console.log("Error al cargar producto")
}
}

updateProd(req, res) {
    try {
        const {id} = req.params
        const {title, price, thumbnail} = req.body
        const updateFind = this.productos.find(producto => producto.id === id)
        if(updateFind){
            const filter = this.productos.filter(producto => producto.id !==id)
            const newProd = {title: title, price: price, thumbnail: thumbnail}
            this.productos = [...filter, newProd]
            return newProd
        } else {
            return ERROR
        } 
    } catch (error) {
        console.log("Error en servidor")
    }
}

deleteById(req, res) {
    try {
        const {id}= req.params
        const deleteId = this.productos.filter(producto => producto.id !== id)
        if(deleteId) {
            const newArray = {...id}
            this.productos = [...deleteId, newArray]
            return newArray
        } else {
            return ERROR
        }
} catch (error) {
        console.log ("Error en servidor")
}
}
}

module.exports = Productos */