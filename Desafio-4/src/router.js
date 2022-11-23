const express = require("express")
const Container = require("./Container")

const router = express.Router()
const container = new Container()

//Configuración de las subrutas
router.get("/productos", (req, res) => {
    const productos = container.getAll();
    res.send(productos);
})

router.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = container.getById(parseInt(id));
  res.send(producto);
})

router.post("/productos", (req, res) => {
  const obj = req.body;
  const newProduct = container.cargarNuevo(obj);
  res.send(newProduct);
})

router.put("/productos/:id", (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const updatedProduct = container.updateProd(parseInt(id), obj);
    res.send(updatedProduct);
  });

router.delete("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = container.deleteById(parseInt(id));
  res.send(producto);
})

module.exports = router