import configClient from "../configClient.js";
import knex from "knex";

const mariaDb = knex(configClient.mariaDb);
const sqlite3 = knex(configClient.sqlite3);

//Función autoejecutable. Creación de tablas
(async() => {
    try {
        await mariaDb.schema.dropTableIfExists('productos');
        await sqlite3.schema.dropTableIfExists('mensajes');

    //Creación de las dos tablas
        await mariaDb.schema.createTable("productos", (table) => {
            table.increments("id").primary();
            table.string("name", 15).notNullable();
            table.float("price").notNullable();
        });

        await sqlite3.schema.createTable("mensajes", (table) => {
            table.increments("id").primary()
            table.string("user").notNullable()
            table.string("message").notNullable()
        });
        console.log("Tablas creadas con éxito")

    //Inserto []  
    const productos = [
        {"name": "Bikini", "price": 4100, "id": 1},
        {"name": "Zapatos", "price": 7600, "id": 2},
        {"name": "Jean Wide", "price": 3300, "id": 3}];
        
    const mensajes = [
        { "author": "Pablo", "text": "Hola, que tal?"},
        { "author": "Marcelo", "text": "muy bien y tu?"},
        { "author": "Belen", "text": "Hola!!"}
        ] 
        
        await mariaDb("productos").insert("productos");
        await sqlite3("mensajes").insert("mensajes");

    //Muestro resultados
    const resultProd = await mariaDb("productos").select("*"); 
    const resultMenj = await sqlite3("mensajes").select("*"); 
    
    //Borro registros
    await mariaDb.from("productos").where("id", 2).del();
    await sqlite3.from("mensajes").where("author", "Pablo").del();

    //Actualizar
    await mariaDb.from("productos").where("id", 2).update({"price": 8000});
    await sqlite3.from("mensajes").where("author", "Pablo").update({"text": "Que andan haciendo?"});
    }
    catch(error){
        console.log("No se pudieron crear las tablas");
    }
    finally{
        configClient.destroy();
    }
})();