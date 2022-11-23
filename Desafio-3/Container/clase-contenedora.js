//Tengo que importar y exportar el modulo
const fs = require("fs").promises

class Contenedor {
//Al constructor le paso la ruta
constructor(path, id){
    this.path = path
}
//Métodos
async save(objeto){
    try {
        const obtenerData = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(obtenerData)
//A la data que ya tengo, le debo poner un id y crear un nuevo objeto
        let id;
        data.length === 0 
        ? (id = 1) 
        : (id = data[data.length - 1]. id + 1);
        const newProduct = {...objeto, id}
        data.push(newProduct)
//Para poder crear este nuevo archivo, debo sobrescribirlo y retornar el nuevo producto con su id       
        await fs.writeFile(this.path, JSON.stringify(data), "utf-8")
        return newProduct.id
        } catch (error) {
        console.log(error)
    }
} 

async getById(id) {
    try {
        const obtenerData = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(obtenerData)
        const objectId = data.find(objectId => objectId.id === id)
        if (!objectId) {
           return null 
        }  return objectId

    } catch (error) {
        console.log(error)
    }
}

async getAll() {
    try {
        const obtenerData = await fs.readFile(this.path, "utf-8")
        return JSON.parse(obtenerData)
    } catch (error) {
        console.log(error)
    }
}

async deleteById(id) {
    try {
        const obtenerData = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(obtenerData)
        
        //Filtro Id
        const deleteId = data.filter(deleteId => deleteId.id !== id)
        //Array nuevo con los id filtrados
        const newArray = {...deleteId}
        data.push(newArray)

        deleteId ? console.log(newArray) : console.log(data)
    }
    catch (error) {
      console.log(error)
    }

}

async deleteAll() {
    try {
        const borrarTodo = await fs.writeFile(this.path, JSON.stringify([]), "utf-8")
    } catch (error) {
        console.log(error)
    }
}
}

module.exports = Contenedor