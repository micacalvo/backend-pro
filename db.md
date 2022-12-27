--> Creación de db
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use dbmica
switched to db dbmica

--> Creación de las dos colecciones
> db.createCollection("mensajes")
{ "ok" : 1 }
> db.createCollection("productos")
{ "ok" : 1 }
>

> show collections
mensajes
productos

--> 1)- 2) Inserto documentos
> db.productos.insertMany([{producto: "Camisa hombre", precio: 4020}, {producto:"Camisa mujer", precio: 4289}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("63ab620412811c07061a31d9"),
                ObjectId("63ab620412811c07061a31da")
        ]
}
>  db.productos.insertMany([{producto: "Jean Wide", precio: 3005}, {producto:"Jean Chupin Negro", precio: 2659}, {producto: "Remera Dama Lino", precio: 1267}, {producto: "Remera Hombre Algodon", precio: 1489}, {producto: "Cinto de cuero", precio: 568}, {producto: "Bikinis", precio: 4652}, {producto: "Maya hombre", precio: 1965}, {producto: "Short Lino", precio: 468}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("63ab633b12811c07061a31db"),
                ObjectId("63ab633b12811c07061a31dc"),
                ObjectId("63ab633b12811c07061a31dd"),
                ObjectId("63ab633b12811c07061a31de"),
                ObjectId("63ab633b12811c07061a31df"),
                ObjectId("63ab633b12811c07061a31e0"),
                ObjectId("63ab633b12811c07061a31e1"),
                ObjectId("63ab633b12811c07061a31e2")
        ]
}


> db.mensajes.insertMany([{autor: "Mica", texto: "Hola, que tal?"}, {autor: "Ana", texto: "Todo bien ¿y ustedes?"}, {autor: "Aldo", texto: "Por aca todo bien"}, {autor: "Mauri", texto: "Me alegro familia"}])
{
        "acknowledged" : true,
        "insertedIds" : [
                ObjectId("63ab644612811c07061a31e3"),
                ObjectId("63ab644612811c07061a31e4"),
                ObjectId("63ab644612811c07061a31e5"),
                ObjectId("63ab644612811c07061a31e6")
        ]
}

--> 3) Listar productos
> db.productos.find()
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005 }
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489 }
{ "_id" : ObjectId("63ab633b12811c07061a31df"), "producto" : "Cinto de cuero", "precio" : 568 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965 }
{ "_id" : ObjectId("63ab633b12811c07061a31e2"), "producto" : "Short Lino", "precio" : 468 }
>
> db.mensajes.find()
{ "_id" : ObjectId("63ab644612811c07061a31e3"), "autor" : "Mica", "texto" : "Hola, que tal?" }
{ "_id" : ObjectId("63ab644612811c07061a31e4"), "autor" : "Ana", "texto" : "Todo bien ¿y ustedes?" }
{ "_id" : ObjectId("63ab644612811c07061a31e5"), "autor" : "Aldo", "texto" : "Por aca todo bien" }
{ "_id" : ObjectId("63ab644612811c07061a31e6"), "autor" : "Mauri", "texto" : "Me alegro familia" }

--> 4) Cantidad de docs en cada colección
> db.productos.estimatedDocumentCount()
10
> db.mensajes.estimatedDocumentCount()
4
>

--> 5) CRUD en productos
a)
> db.productos.find()
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005 }
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489 }
{ "_id" : ObjectId("63ab633b12811c07061a31df"), "producto" : "Cinto de cuero", "precio" : 568 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965 }
{ "_id" : ObjectId("63ab633b12811c07061a31e2"), "producto" : "Short Lino", "precio" : 468 }

> db.productos.insertOne({producto: "Musculosa Algodon", precio: 1236})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("63ab667112811c07061a31e7")
}

b) 1) Menores a $1000
> db.productos.find({precio: {$lt: 1000}})
{ "_id" : ObjectId("63ab633b12811c07061a31df"), "producto" : "Cinto de cuero", "precio" : 568 }
{ "_id" : ObjectId("63ab633b12811c07061a31e2"), "producto" : "Short Lino", "precio" : 468 }

b) 2) Precios entre $1000 y $3000

b) 3) Precios mayores a $3000
> db.productos.find({precio: {$gt: 3000}})
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652 }

b) 4) Realizar una consulta que traiga sólo el nombre del tercer producto más barato

c) Update stock 
> db.productos.updateMany({}, {$set: {stock: 100}})
{ "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 10 }
> db.productos.find()
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020, "stock" : 100 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31df"), "producto" : "Cinto de cuero", "precio" : 568, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e2"), "producto" : "Short Lino", "precio" : 468, "stock" : 100 }
{ "_id" : ObjectId("63ab667112811c07061a31e7"), "producto" : "Musculosa Algodon", "precio" : 1236, "stock" : 100 }

d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
> db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})
{ "acknowledged" : true, "matchedCount" : 3, "modifiedCount" : 3 }
> db.productos.find()
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020, "stock" : 0 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289, "stock" : 0 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31df"), "producto" : "Cinto de cuero", "precio" : 568, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652, "stock" : 0 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e2"), "producto" : "Short Lino", "precio" : 468, "stock" : 100 }
{ "_id" : ObjectId("63ab667112811c07061a31e7"), "producto" : "Musculosa Algodon", "precio" : 1236, "stock" : 100 }

e) Borrar productos con precios menores a $1000
> db.productos.deleteMany({precio: {$lt: 1000}})
{ "acknowledged" : true, "deletedCount" : 2 }
> db.productos.find()
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020, "stock" : 0 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289, "stock" : 0 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652, "stock" : 0 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965, "stock" : 100 }
{ "_id" : ObjectId("63ab667112811c07061a31e7"), "producto" : "Musculosa Algodon", "precio" : 1236, "stock" : 100 }

--> 6) Creacion de usuario
> show dbs
admin   0.000GB
config  0.000GB
dbmica  0.000GB
local   0.000GB
> use admin
switched to db admin
> use dbroles
switched to db dbroles
> use admin
switched to db admin
> db.createUser({user: "Pepe", psw: asd456, roles: [{role: "read", db: "dbroles"}]})
uncaught exception: ReferenceError: asd456 is not defined :
@(shell):1:30
> db.createUser({user: "Pepe", psw: "asd456", roles: [{role: "read", db: 2dbroles"}]})
uncaught exception: SyntaxError: identifier starts immediately after numeric literal :
@(shell):1:71
> db.createUser({user:"Pepe", pwd:"123456", roles:[{role:"read", db:"dbroles"}]})
Successfully added user: {
        "user" : "Pepe",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "dbroles"
                }
        ]
}
> ^C
bye

C:\Users\micac>mongo -u Pepe
MongoDB shell version v5.0.14
Enter password: 
No me deja escribir la contraseña!
