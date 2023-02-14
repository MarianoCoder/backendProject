import express from "express";
import Products from "./api/products.js";
import Carts from "./api/carts.js";

let products = new Products();
let carts = new Carts();

const app = express();
app.use(express.static("public"));

const routerProducts = express.Router();
const routerCarts = express.Router();

app.use("/api", routerProducts);
app.use("/api", routerCarts);

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));

routerProducts.get("/products/list", (req, res) => {
  res.json(products.listAll());
});

routerProducts.get("/products/list/:pid", (req, res) => {
  let { id } = req.params;
  res.json(products.listId(id));
});

routerProducts.post("/products/save", (req, res) => {
  let product = req.body;
  products.save(product);
  res.json(product);
});

routerProducts.put("/products/refresh/:pid", (req, res) => {
  let { id } = req.params;
  let product = req.body;
  products.refresh(product, id);
  res.json(product);
});

routerProducts.delete("/products/delete/:pid", (req, res) => {
  let { id } = req.params;
  let product = products.delete(id);
  res.json(product);
});

routerCarts.post("/carts/save", (req, res) => {
  let cart = req.body;
  carts.save(cart);
  res.json(cart);
});

routerCarts.get("/carts/:cid", (req, res) => {
  let { cid } = req.params;
  res.json(carts.listCid(cid));
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
