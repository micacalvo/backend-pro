import clientConnection from "../configClient.js";

//Función autoejecutable. Creación de tablas
(async() => {
    try {
       await clientConnection.schema.dropTableIfExists('productos');
      
    //Creación de las dos tablas
        await clientConnection.schema.createTable("productos", (table) => {
            table.increments("id").primary();
            table.string("name");
            table.integer("price");
        });
    
        console.log("Tablas creadas con éxito")
    }
    
    catch(error){
        console.log("No se pudieron crear las tablas");
    }
    
    finally{
        clientConnection.destroy();
        sqlite3.destroy();
    }
})();