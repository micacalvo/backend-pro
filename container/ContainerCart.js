const fs = require('fs').promises
//const path = require("./cart.json")

//CRUD
class ContainerCart{
    constructor (path){
        this.path = path
    }

//Metodo para crear el carrito     
    async saveObj(obj){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            let timestamp= new Date().toLocaleString()
            let id 
            if(obj.id) {
                id = obj.id
            } else {
                if(data.length === 0){
                    id = 1 
                } else {
                    id = data.length + 1
                }
            }
            const newCart = {...obj, id, timestamp}
            data.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return obj.id 
        } catch (error) {
            const errorMsg = "No se pudo agregar al carrito"
            return (errorMsg)
        }
    }

//Listar todos los productos del carrito    
    async getAll(){
        try {
            const all = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(all)
        } catch (error) {
            const errorMsg = 'No se encontraron resultados'
            return errorMsg
        }
    }

//Buscar por id    
    async getById(id){
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            let data = JSON.parse(leer)
            const obj = data.find (obj => obj.id === id)
            if (!obj) {
                const noId = 'No se encontro ese producto'
                return noId           
            }else{
               return obj
            }              
        } catch (error) {
            console.log(error)
        }
    }

//Eliminar todo el carrito    
    async deleteCart(){
        try {
            const all = await fs.writeFile(this.path, JSON.stringify([]), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteObj(id){
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
}

module.exports=ContainerCart 