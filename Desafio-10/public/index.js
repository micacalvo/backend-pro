// Establecemos la comunicacion del lado del cliente 
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

socket.on("Productos", async (productos) => {
    const htmlProductos = await makeHtmlTable(productos);
    document.getElementById("productos").innerHTML = htmlProductos;
  });
  
async function makeHtmlTable(productos) {
      const html = {productos};
      return thml
}

// Chat websocket
const inputName = document.getElementById("authorName");
const inputFoto = document.getElementById("authorFoto");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

// Selecciono el form completo y procedemos a hacer un prevent default
const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameValue = inputName.value;
    const fotoValue = inputFoto.value;
    const date = new Date().toLocaleDateString('es-ES')
    const time = new Date().toLocaleTimeString();
    const textValue = inputMensaje.value;
    const newMensaje = {
      author: {
        name: nameValue,
        foto: fotoValue
      },
      text: textValue,
      date: date + " " + time
    };
    socket.emit("newMensaje", newMensaje);
    formPublicarMensaje.reset();
  });

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
        return `<div style="margin-bottom: 10px;">
        <img src="${mensaje.author.foto}" height="30px">
        <strong style="color:blue;">
        ${mensaje.author.name + " "}
        </strong>
        <i style="color:green;">${mensaje.text}</i>
        </div>`;
      })
      .join(" ");
    return html;
  }