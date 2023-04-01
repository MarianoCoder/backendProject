import express from "express";
import apiRouter from "./routers/api/index.js";
import viewsRouter from "./routers/views/index.js";
import { init } from "./dao/db/mongodb.js";
import ProductModel from "./dao/models/product.js"


 await init();
const app = express();

app.get("/", async (req, res) =>{
    const options ={
        limit: 10,
        page: 1
    }
    const result = await ProductModel.paginate({}, options)
    res.json(result)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("./public"));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/", viewsRouter);
app.use("/api", apiRouter);


export default app;