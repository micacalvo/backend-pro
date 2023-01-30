/* // Establecemos la comunicacion del lado del cliente 
const socket = io.connect()

// Selecciono el form completo y hacemos un preventDefault
const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleValue = document.querySelector("input[name=title]").value;
  const priceValue = document.querySelector("input[name=price]").value;
  const thumbnailValue = document.querySelector("input[name=thumbnail]").value;
  const newProducto = {
    title: titleValue,
    price: priceValue,
    thumbnail: thumbnailValue,
  };
  socket.emit('newProducto', newProducto)
});

// Renderizamos los productos en el html

socket.on("productos", async (productos) => {
    const htmlProductos = await makeHtmlTable(productos);
    document.getElementById("productos").innerHTML = htmlProductos;
  });
  
async function makeHtmlTable(productos) {
      const html = {productos};
      return thml
}

//Desnormalización de mensajes
// Definimos un esquema de autor
const authorSchema = new normalizr.schema.Entity('authors',{}, {idAttribute:"mail"});

// Definimos un esquema de mensaje
const textSchema = new normalizr.schema.Entity('text');

// Definimos un esquema de posts
const mensajeSchema = new normalizr.schema.Entity('mensajes', {
    author: authorSchema,
    text: [textSchema]
})

// Chat websocket
const inputName = document.getElementById("username");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

// Selecciono el form completo y procedemos a hacer un prevent default
const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const mensaje = {
      author: {
          mail: inputName.value,
          name: document.getElementById('firstname').value,
          lastName: document.getElementById('lastname').value,
          age: document.getElementById('age').value,
          username: document.getElementById('alias').value,
          avatar: document.getElementById('avatar').value
      },
      text: inputMensaje.value
  }

  socket.emit('newMensaje', mensaje);
  formPublicarMensaje.reset()
  inputMensaje.focus()
})

  socket.on("mensaje", mensajes=> {
    // Desnormalizamos los mensajes recibidos por el socket y los integramos al html
    let mensajesDenormalized = normalizr.denormalize(mensajes.result, [mensajeSchema], mensajes.entities)
    const html = makeHtmlList(mensajesDenormalized)
    document.getElementById('mensajes').innerHTML = html;
    
    // Guardamos el tamaño de la data y hacemos el porcentaje
    let mensajessize = JSON.stringify(mensajes).length
    console.log(mensajes, mensajessize);
    let mensajesDsize = JSON.stringify(mensajesDenormalized).length
    console.log(mensajesDenormalized, mensajesDsize);

    // Logica del porcentaje
    let porcentajeC = parseInt((mensajessize * 100) / mensajesDsize)
    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC
  });
  
  // Funcion del html para integrar todos los datos de lo recibido por el socket
  function makeHtmlList(mensajes) {
    const html = mensajes
      .map((mensaje) => {
        return `<div>
        <b style="color:blue;">${mensaje.author.mail}</b>
        [<span style="color:brown;">${mensaje.date}</span>] :
        <i style="color:green;">${mensaje.text}</i>
        <img width="50" src="${mensaje.author.avatar}" alt=" ">
    </div>`;
      })
      .join(" ");
    return html;
  } */