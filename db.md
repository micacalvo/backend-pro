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
> db.productos.find({$and:[{precio: {$gt: 1000}}, {precio: {$lt: 3000}}]})
{ "_id" : ObjectId("63ab633b12811c07061a31dc"), "producto" : "Jean Chupin Negro", "precio" : 2659, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31dd"), "producto" : "Remera Dama Lino", "precio" : 1267, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489, "stock" : 100 }
{ "_id" : ObjectId("63ab633b12811c07061a31e1"), "producto" : "Maya hombre", "precio" : 1965, "stock" : 100 }
{ "_id" : ObjectId("63ab667112811c07061a31e7"), "producto" : "Musculosa Algodon", "precio" : 1236, "stock" : 100 }
>

b) 3) Precios mayores a $3000
> db.productos.find({precio: {$gt: 3000}})
{ "_id" : ObjectId("63ab620412811c07061a31d9"), "producto" : "Camisa hombre", "precio" : 4020 }
{ "_id" : ObjectId("63ab620412811c07061a31da"), "producto" : "Camisa mujer", "precio" : 4289 }
{ "_id" : ObjectId("63ab633b12811c07061a31db"), "producto" : "Jean Wide", "precio" : 3005 }
{ "_id" : ObjectId("63ab633b12811c07061a31e0"), "producto" : "Bikinis", "precio" : 4652 }

b) 4) Realizar una consulta que traiga sólo el nombre del tercer producto más barato
> db.productos.find().skip(2).limit(1).sort({precio: 1})
{ "_id" : ObjectId("63ab633b12811c07061a31de"), "producto" : "Remera Hombre Algodon", "precio" : 1489, "stock" : 100 }
>

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
> db.createUser({user: "Pepito", pwd:"123456", roles:[{role:"read", db:"dbmica"}]})
Successfully added user: {
        "user" : "Pepito",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "dbmica"
                }
        ]
}
>
C:\Users\micac>mongod --auth
{"t":{"$date":"2022-12-30T19:28:51.848-03:00"},"s":"I",  "c":"CONTROL",  "id":23285,   "ctx":"-","msg":"Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'"}
{"t":{"$date":"2022-12-30T19:28:53.735-03:00"},"s":"I",  "c":"NETWORK",  "id":4915701, "ctx":"-","msg":"Initialized wire specification","attr":{"spec":{"incomingExternalClient":{"minWireVersion":0,"maxWireVersion":13},"incomingInternalClient":{"minWireVersion":0,"maxWireVersion":13},"outgoing":{"minWireVersion":0,"maxWireVersion":13},"isInternalClient":true}}}
{"t":{"$date":"2022-12-30T19:28:53.738-03:00"},"s":"W",  "c":"ASIO",     "id":22601,   "ctx":"thread1","msg":"No TransportLayer configured during NetworkInterface startup"}
{"t":{"$date":"2022-12-30T19:28:53.739-03:00"},"s":"I",  "c":"NETWORK",  "id":4648602, "ctx":"thread1","msg":"Implicit TCP FastOpen in use."}
{"t":{"$date":"2022-12-30T19:28:53.746-03:00"},"s":"W",  "c":"ASIO",     "id":22601,   "ctx":"thread1","msg":"No TransportLayer configured during NetworkInterface startup"}
{"t":{"$date":"2022-12-30T19:28:53.747-03:00"},"s":"I",  "c":"REPL",     "id":5123008, "ctx":"thread1","msg":"Successfully registered PrimaryOnlyService","attr":{"service":"TenantMigrationDonorService","ns":"config.tenantMigrationDonors"}}
{"t":{"$date":"2022-12-30T19:28:53.747-03:00"},"s":"I",  "c":"REPL",     "id":5123008, "ctx":"thread1","msg":"Successfully registered PrimaryOnlyService","attr":{"service":"TenantMigrationRecipientService","ns":"config.tenantMigrationRecipients"}}
{"t":{"$date":"2022-12-30T19:28:53.747-03:00"},"s":"I",  "c":"CONTROL",  "id":5945603, "ctx":"thread1","msg":"Multi threading initialized"}
{"t":{"$date":"2022-12-30T19:28:53.751-03:00"},"s":"I",  "c":"CONTROL",  "id":4615611, "ctx":"initandlisten","msg":"MongoDB starting","attr":{"pid":7560,"port":27017,"dbPath":"C:/data/db/","architecture":"64-bit","host":"DESKTOP-VVSNNKN"}}
{"t":{"$date":"2022-12-30T19:28:53.751-03:00"},"s":"I",  "c":"CONTROL",  "id":23398,   "ctx":"initandlisten","msg":"Target operating system minimum version","attr":{"targetMinOS":"Windows 7/Windows Server 2008 R2"}}
{"t":{"$date":"2022-12-30T19:28:53.751-03:00"},"s":"I",  "c":"CONTROL",  "id":23403,   "ctx":"initandlisten","msg":"Build Info","attr":{"buildInfo":{"version":"5.0.14","gitVersion":"1b3b0073a0b436a8a502b612f24fb2bd572772e5","modules":[],"allocator":"tcmalloc","environment":{"distmod":"windows","distarch":"x86_64","target_arch":"x86_64"}}}}
{"t":{"$date":"2022-12-30T19:28:53.752-03:00"},"s":"I",  "c":"CONTROL",  "id":51765,   "ctx":"initandlisten","msg":"Operating System","attr":{"os":{"name":"Microsoft Windows 10","version":"10.0 (build 19044)"}}}
{"t":{"$date":"2022-12-30T19:28:53.753-03:00"},"s":"I",  "c":"CONTROL",  "id":21951,   "ctx":"initandlisten","msg":"Options set by command line","attr":{"options":{"security":{"authorization":"enabled"}}}}
{"t":{"$date":"2022-12-30T19:28:53.760-03:00"},"s":"E",  "c":"CONTROL",  "id":20557,   "ctx":"initandlisten","msg":"DBException in initAndListen, terminating","attr":{"error":"NonExistentPath: Data directory C:\\data\\db\\ not found. Create the missing directory or specify another path using (1) the --dbpath command line option, or (2) by adding the 'storage.dbPath' option in the configuration file."}}
{"t":{"$date":"2022-12-30T19:28:53.762-03:00"},"s":"I",  "c":"REPL",     "id":4784900, "ctx":"initandlisten","msg":"Stepping down the ReplicationCoordinator for shutdown","attr":{"waitTimeMillis":15000}}
{"t":{"$date":"2022-12-30T19:28:53.765-03:00"},"s":"I",  "c":"COMMAND",  "id":4784901, "ctx":"initandlisten","msg":"Shutting down the MirrorMaestro"}
{"t":{"$date":"2022-12-30T19:28:53.768-03:00"},"s":"I",  "c":"SHARDING", "id":4784902, "ctx":"initandlisten","msg":"Shutting down the WaitForMajorityService"}
{"t":{"$date":"2022-12-30T19:28:53.770-03:00"},"s":"I",  "c":"NETWORK",  "id":20562,   "ctx":"initandlisten","msg":"Shutdown: going to close listening sockets"}
{"t":{"$date":"2022-12-30T19:28:53.773-03:00"},"s":"I",  "c":"NETWORK",  "id":4784905, "ctx":"initandlisten","msg":"Shutting down the global connection pool"}
{"t":{"$date":"2022-12-30T19:28:53.774-03:00"},"s":"I",  "c":"CONTROL",  "id":4784906, "ctx":"initandlisten","msg":"Shutting down the FlowControlTicketholder"}
{"t":{"$date":"2022-12-30T19:28:53.775-03:00"},"s":"I",  "c":"-",        "id":20520,   "ctx":"initandlisten","msg":"Stopping further Flow Control ticket acquisitions."}
{"t":{"$date":"2022-12-30T19:28:53.776-03:00"},"s":"I",  "c":"NETWORK",  "id":4784918, "ctx":"initandlisten","msg":"Shutting down the ReplicaSetMonitor"}
{"t":{"$date":"2022-12-30T19:28:53.779-03:00"},"s":"I",  "c":"SHARDING", "id":4784921, "ctx":"initandlisten","msg":"Shutting down the MigrationUtilExecutor"}
{"t":{"$date":"2022-12-30T19:28:53.786-03:00"},"s":"I",  "c":"ASIO",     "id":22582,   "ctx":"MigrationUtil-TaskExecutor","msg":"Killing all outstanding egress activity."}
{"t":{"$date":"2022-12-30T19:28:53.787-03:00"},"s":"I",  "c":"COMMAND",  "id":4784923, "ctx":"initandlisten","msg":"Shutting down the ServiceEntryPoint"}
{"t":{"$date":"2022-12-30T19:28:53.789-03:00"},"s":"I",  "c":"CONTROL",  "id":4784925, "ctx":"initandlisten","msg":"Shutting down free monitoring"}
{"t":{"$date":"2022-12-30T19:28:53.790-03:00"},"s":"I",  "c":"CONTROL",  "id":4784927, "ctx":"initandlisten","msg":"Shutting down the HealthLog"}
{"t":{"$date":"2022-12-30T19:28:53.792-03:00"},"s":"I",  "c":"CONTROL",  "id":4784928, "ctx":"initandlisten","msg":"Shutting down the TTL monitor"}
{"t":{"$date":"2022-12-30T19:28:53.793-03:00"},"s":"I",  "c":"CONTROL",  "id":4784929, "ctx":"initandlisten","msg":"Acquiring the global lock for shutdown"}
{"t":{"$date":"2022-12-30T19:28:53.794-03:00"},"s":"I",  "c":"-",        "id":4784931, "ctx":"initandlisten","msg":"Dropping the scope cache for shutdown"}
{"t":{"$date":"2022-12-30T19:28:53.796-03:00"},"s":"I",  "c":"FTDC",     "id":4784926, "ctx":"initandlisten","msg":"Shutting down full-time data capture"}
{"t":{"$date":"2022-12-30T19:28:53.800-03:00"},"s":"I",  "c":"CONTROL",  "id":20565,   "ctx":"initandlisten","msg":"Now exiting"}
{"t":{"$date":"2022-12-30T19:28:53.802-03:00"},"s":"I",  "c":"CONTROL",  "id":23138,   "ctx":"initandlisten","msg":"Shutting down","attr":{"exitCode":100}}

C:\Users\micac>mongo -u Pepito
MongoDB shell version v5.0.14
Enter password:
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("5bb51874-4cac-4381-a74d-bec49ff7eb0a") }
MongoDB server version: 5.0.14
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
---
The server generated these startup warnings when booting:
        2022-12-23T12:38:40.754-03:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDB's free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
> db.productos.find()
> use dbmica
switched to db dbmica
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
> db.users.insertOne()
uncaught exception: Error: argument passed to addIdIfNeeded is not an object :
DBCollection.prototype.addIdIfNeeded@src/mongo/shell/crud_api.js:31:15
DBCollection.prototype.insertOne@src/mongo/shell/crud_api.js:250:16
@(shell):1:1
>