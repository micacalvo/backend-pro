const ERROR = { error: "producto no encontrado" };

class Container {
    constructor (){
        this.productos = []
}
//Métodos:

getById(id) {
    try {
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

getAll() {
    try {
        return this.productos
    } catch (error) {
        console.log(error)
    }
}

cargarNuevo(obj){
    try {
        const newObj = this.productos.map(producto => producto.id)
        const idMax = newObj.length === 0 ? 0 : Math.max(...newObj);
        const id = idMax + 1
        const newProd = {...id, obj}
        this.productos.push(newProd)
        return newProd
    } catch (error) {
        console.log("Error al cargar producto")
}
}

updateProd(id, obj) {
    try {
        const updateFind = this.productos.find(producto => producto.id === id)
        if(updateFind){
            const filter = this.productos.filter(producto => producto.id !==id)
            const newProd = {...id, obj}
            this.productos = [...filter, newProd,]
            return newProd
        } else {
            return ERROR
        } 
    } catch (error) {
        console.log("Error en servidor")
    }
}

deleteById(id, obj) {
    try {
        const deleteId = this.productos.filter(producto => producto.id !== id)
        if(deleteId) {
            const newArray = {...id, obj}
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

module.exports = Container