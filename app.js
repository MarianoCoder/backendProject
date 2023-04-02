import express from "express";
import apiRouter from "./routers/api/index.js";
import viewsRouter from "./routers/views/index.js";
import { init } from "./dao/db/mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
import routers from "./routers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await init();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/static", express.static("./public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//app.use("/", viewsRouter);
app.use("/api", apiRouter);
app.use("/", routers);

export default app;
