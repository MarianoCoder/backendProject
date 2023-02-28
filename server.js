import express from "express";
import Products from "./api/products.js";
import Carts from "./api/carts.js";
//import http from "http";
//import {Server} from "socket.io";
//import {create} from "express-handlebars"

let products = new Products();
let carts = new Carts();

const app = express();
app.use(express.static("public"));
//const server = http.createServer(app);
//const io = new Server(server);
//const hbs = create({ defaultLayout: 'index', extname: '.hbs',});

const routerProducts = express.Router();
const routerCarts = express.Router();

app.use("/api", routerProducts);
app.use("/api", routerCarts);

//app.engine("handlebars", hbs.engine)
//app.set("view engine","handlebars")
//app.set("views", "./views")

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));
routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: true }));

routerProducts.get("/products/list", (req, res) => {
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


/*
io.on("conection", (socket)=>{
  console.log("Usuario conectado")

  socket.on("mensaje", (mensaje)=>{
      io.emit("mensaje", mensaje)
  })

  socket.on("disconect", ()=>{
      console.log("Usuario desconectado")
  })
})*/

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));