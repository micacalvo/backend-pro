//Normalizr
import { normalize, schema} from 'normalizr';
import util from 'util';
function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

print()

//Definimos un esquemas de autores
const authorSchema = new schema.Entity('authors', {}, {idAttribute:"name"});
const textSchema = new schema.Entity('text');
const mensajeSchema = new schema.Entity('mensajes', {
    author: authorSchema,
    text: [textSchema]
});

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, [mensajeSchema])

export default normalizarMensajes