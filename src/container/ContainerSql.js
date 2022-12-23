//CRUD SQL
import configClient from "../configClient.js"

class ContainerSql {
    constructor(table){
        this.table = table
    }
    async save(item) {
        try {
            const ids = await configClient(this.table).insert(item)
            return ids
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            return configClient(this.table).where("id", id).select("*")
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return configClient(this.table).select("*").limit(15)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            return configClient(this.table).where("id", id).delete()
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, product){
        try {
            const dbid = await configClient(this.table).where("id", id).update(product)
            return dbid
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContainerSql;