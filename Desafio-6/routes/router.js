const {Router} = require("Express")
const router = Router()

let productos = []
let mensajes = []

router.get("/", (req, res) => {
    res.render('form', {productos})
})

router.get("/", (req,res)=> {
    res.render('form', {mensajes})
})

module.exports = { 
    router, productos, mensajes
}