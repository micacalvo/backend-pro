//Contenedor de memoria de los mensajes
import fs from 'fs';

//CRUD
class ContenedorMemoria{
    constructor (path){
        this.path = path
    }

//Metodo para crear el mensaje     
    async save(obj){
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
            const newMensaje = {...obj, id, timestamp}
            data.push(newMensaje)
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return obj.id 
        } catch (error) {
            const errorMsg = "No se pudo agregar el mensaje"
            return (errorMsg)
        }
    }

//Listar todos los mensajes
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
                const noId = 'No se encontro ese mensaje'
                return noId           
            }else{
               return obj
            }              
        } catch (error) {
            console.log(error)
        }
    }

//Eliminar todos los mensajes    
    async deleteAll(){
        try {
            const all = await fs.writeFile(this.path, JSON.stringify([]), "utf-8")
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
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

export default ContenedorMemoria 