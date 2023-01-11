//Contenedor de archivo para productos
const fs = require('fs').promises

//CRUD
class ContenedorArchivo{
    constructor (path){
        this.path = path
    }

// Metodo Save(Object)--> Me permite crear objetos
    async save(obj){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            let id
            if (obj.id) {
                id = obj.id
            } else {
                if (data.length === 0) {
                    id = 1
                }else{
                    id = data.length +1
                }                
            }
            const newObj = {...obj, id}
            data.push(newObj)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return data
        } catch (error) {
            console.log(error)
        }
    }

//Listar todos los productos    
    async getAll(){
        try {
            const all = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            console.log(error)
        }
    }

// Metodo encontar un producto por su id(Number)
    async getById(id){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            const obj = data.find(obj => id === obj.id)
            if (!obj) {
                const noId = "No se encontro ese producto"
                return noId            
            } else {
               return obj
            }              
        } catch (error) {
            console.log(error)
        }
    }   

// Metodo borrar un producto por su ID(Number)
    async deleteById(id) {
        try {
            const leer = await fs.readFile(this.path,"utf-8")
            const data = JSON.parse(leer)

            const obj = data.filter(obj => obj.id !== id)
            if(!obj) {
                return null
            }
            data.push(obj)
            await fs.writeFile(this.path, JSON.stringify(obj, null, 2), "utf-8")
            return obj
        } catch(error) {
            console.log(error)
        }
    }

//Metodo para eliminar todos los productos     
    async deleteAll() {
        try {
            const all = await fs.writeFile(this.path, JSON.stringify([]), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }

/* // Método update
    async update (updateProd, index){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)

            data[index] = updateProd
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
        } catch (error) {
            const errorMsg = 'No se pudo actualizar el producto'
            return errorMsg
        }
    } */
}; 

module.exports= ContenedorArchivo
