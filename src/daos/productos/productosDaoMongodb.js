import ContenedorMongodb from "../../contenedores/ContenedorMongodb.js"

//Data
const productos = [
    {_id:"63ab620412811c07061a31d9",producto: "Camisa hombre",precio: 4020,stock: 0},
    {_id:"63ab620412811c07061a31da",producto: "Camisa mujer",precio: 4289,stock: 0},
    {_id:"63ab633b12811c07061a31db",producto: "Jean Wide",precio: 3005,stock: 100},
    {_id:"63ab633b12811c07061a31dc",producto: "Jean Chupin Negro",precio: 2659,stock: 100},
    {_id:"63ab633b12811c07061a31dd",producto: "Remera Dama Lino",precio: 1267,stock: 100},
    {_id:"63ab633b12811c07061a31de",producto: "Remera Hombre Algodon",precio: 1489,stock: 100},
    {_id:"63ab633b12811c07061a31e0",producto: "Bikinis",precio: 4652,stock: 0},
    {_id:"63ab633b12811c07061a31e1",producto: "Maya hombre",precio: 1965,stock: 100},
    {_id:"63ab667112811c07061a31e7",producto: "Musculosa Algodon",precio: 1236,stock: 100}
]

class ProductosDaoMongodb extends ContenedorMongodb {
    constructor() {
        super('productos', {
            producto: {type: String, required: true },
            precio: {type: Number, required: true },
            stock: {type: Number, required: true},
        })
    }
}
export default ProductosDaoMongodb
