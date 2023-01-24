import knex from 'knex';

const clientConnection = knex({
        client: 'sqlite3',
        connection: {
            filename: `./db/dbmica.sqlite`
        },
        useNullAsDefault: true,
     
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'srbrisa14',
            database: 'testmica',
            port: '8889'
        } 
    
})

export default clientConnection;
