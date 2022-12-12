// 1-Entablo comunicación del lado del cliente
const socket= io.connect()

// 4- Función que se ejecuta al enviar un producto nuevo
function addProduct() {
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const foto = document.getElementById('foto').value
    const btnEnviar = document.getElementById('btnEnviar') 

    const newProd = {
        title: nombre,
        price: precio,
        thumbnail: foto
    }

    socket.emit('new-product', newProd)
    return false
}

// 3-Función para renderizar los productos
function renderProd(info) {
const datos = info.map(producto => {
    return(`<tr>
                <td><strong>${producto.title}</strong></td> 
                <td><em>$${producto.price}</em></td> 
                <td><img src= ${producto.thumbnail} alt="foto del producto" class="productsImage"></img></td>
            </tr>`)
}).join(' ')

    document.getElementById('productos').innerHTML = datos
}

// Recibe los datos del cliente
function addNewMensaje() {
    const authorname= document.getElementById('inputUsername').value
    const textmsn = document.getElementById('inputMensaje').value
    const btnEnviar = document.getElementById('btnEnviar')
    const formPublicar = document.getElementById('formPublicarMensaje')
    
    let date = new Date().toLocaleDateString()
    
    const mensaje = {
        author: authorname,
        text: textmsn,
        date: date
    }
    
    document.getElementById('inputMensaje').value = ''
    socket.emit('new-message', mensaje)
    return false
}

// 3-Función para renderizar los mensajes
function render(data) {
    const html = data.map(item =>{
        return(`<div><strong>${item.author}</strong> 
        <span class="fecha">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
        :  <em class="texto-msj">${item.text}</em></div>`)
    }).join(' ')
    
    document.getElementById('mensajes').innerHTML= html
}

// 2-Defino el evento de escucha de lo que viene del server  
socket.on('mensajes', data =>{
render(data)
})

socket.on('productos', info =>{ 
    renderProd(info)
})