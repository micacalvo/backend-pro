//Traigo la dependecia y la llave
import admin from 'firebase-admin';
const serviceAcount = '../../db/backendmica-firebase-adminsdk-f6in6-9dedd9eb50.json';

//Configuración para conexión con base de datos
admin.initializeApp({
    credential: admin.credential.cert(serviceAcount),
    databaseURL: 'https://backendmica.firebaseio.com'
})

console.log('Base de datos conectada')

//Le indicamos que vamos a trabajar con firestore
const db = admin.firestore()

class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async save(nuevoItem){
        try {
            const data = await this.coleccion.add(nuevoItem)
            return {...nuevoItem, id: data.id}
        } catch (error) {
            console.log('No se pudo crear documento')
        }
    }

    async getAll() {
        try {
            const data = await this.coleccion.get()
            let docs = data.docs
            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))
                return response
        } catch (error) {
            console.log('No se pudo obtener los documentos')
        }
    }

    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get()
            if(doc.exists){
                const data = doc.data()
                return data
            } else {
                console.log('No se encontro el documento')
            }
        } catch (error) {
            console.log('No se pudo encontrar el documento')
        }
    }

    async updateById(nuevoElem){
        try {
            const dataNueva = await this.coleccion.doc(nuevoElem).set(nuevoElem)
            return dataNueva
        } catch (error) {
            console.log('No se puede actualizar el documento')
        }
    }

    async deleteById(id){
        try {
            const doc = await this.coleccion.doc(id).delete()
            return doc
        } catch (error) {
            console.log('No se puede eliminar el documento')
        }
    }

    async deleteAll() {
        try {
            const data = await this.coleccion.get()
            let docs = data.docs
            const deleted = docs.delete()
            return deleted
        } catch (error) {
            console.log('No se puede eliminar los documentos')
        }
    }
}

export default ContenedorFirebase;