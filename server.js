import express from "express";
import Products from "./dao/fs/products.js";
import Carts from "./dao/fs/carts.js";
import http from "http";
import app from "./app.js";
import { init } from "./socket.js";

let products = new Products();
let carts = new Carts();

//const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

const routerProducts = express.Router();
const routerCarts = express.Router();

app.use("/api", routerProducts);
app.use("/api", routerCarts);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("./public"));

routerProducts.use(express.static("./public"));

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));

routerProducts.get("/products/list", (req, res) => {
  res.render("products", products.listAll());
  res.json(products.listAll());
});

routerProducts.get("/products/list/:pid", (req, res) => {
  let { pid } = req.params;
  res.json(products.listId(pid));
});

routerProducts.post("/products/save", (req, res) => {
  let product = req.body;
  products.save(product);
  res.json(product);
});

routerProducts.put("/products/refresh/:pid", (req, res) => {
  let { pid } = req.params;
  let product = req.body;
  products.refresh(product, pid);
  res.json(product);
});

routerProducts.delete("/products/delete/:pid", (req, res) => {
  let { pid } = req.params;
  let product = products.delete(pid);
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

routerCarts.post("/carts/:cid/products/:pid", (req, res) => {
  let cart = req.body;
  let { cid } = req.params;
  let { pid } = req.params;
  carts.push(cart(pid));
  res.json(carts.refresh(cid));
});

const PORT = process.env.NODE_PORT || 3000;
const server = http.createServer(app);

init(server);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
