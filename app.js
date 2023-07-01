import express from "express";
import apiRouter from "./routers/api/index.js";
import viewsRouter from "./routers/views/index.js";
import { init } from "./dao/db/mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
import routers from "./routers/index.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import cors from "cors";
import nodemailer from "nodemailer";
import emailService from "./services/email.service.js";
import errorMiddleware from "./utils/MiddlewareError.js";
import { addLogger } from "./utils/logger.js";
import { generateProduct } from "./utils/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
//import { log } from "winston";

await init();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/mailing", async (req, res) => {
  res.send(`
    <div>
    <h1>📨 Mailing & SMS 📲</h1>
    <ul>
    <li><a href="/email">Enviar Email</a></li>
    <li><a href="/sms">Enviar SMS</a></li>
    </ul>
    </div>
    `);
});

app.get("/email", async (req, res) => {
  const attachments = [
    {
      filename: "ddl.png",
      path: path.join(__dirname, "./public/imgs/ddl.png"),
      cid: "dulce_de_leche",
    },
  ];
  const result = await emailService.sendEmail(
    "maoaltacba@gmail.com",
    "Gracias por tu compra!",
    `
    <div>
    <h1>🛒 Confirmamos tu orden #001</h1>
    <p>Imagen a modo ilustrativo</p>
    <img src="cid:dulce_de_leche" />
    </div>
    `,
    attachments
  );
  console.log(result);
  res.send(`
    <div>
    <h1>📨 Sección de emails</h1>
    <a href="/mailing">⬅️ Atrás</a>
    </div>
    `);
});

app.get("/sms", async (req, res) => {
  res.send(`
    <div>
    <h1>📲 Sección de sms</h1>
    <a href="/mailing">⬅️ Atrás</a>
    </div>
    `);
});

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "maoaltacba@gmail.com",
    pass: "yafazmrjpviivwrs",
  },
});

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions: {},
      ttl: 20,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/static", express.static("./public"));
//app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(errorMiddleware);

initPassport();
app.use(passport.initialize());
app.use(passport.session());

//app.use("/", viewsRouter);
app.use("/api", apiRouter);
app.use("/", routers);
app.use(addLogger);

app.get("/logger", (req, res) => {
  req.logger.warn("Esto fue un warn");
  req.logger.error("Esto fue un error");
  req.logger.info("Esto fue un info");
  req.logger.debug("Esto fue un debug");
  res.send("<h1> Hello world </h1>");
});

app.use((error, req, res, next) => {
  console.error("Error Middelware", error);
  res.status(error.status || 500).json({ message: error.message });
});

app.get("/api/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  res.status(200).json({ status: true, data: products });
});

console.log("path", path.join(__dirname, "docs", "**", "*.yaml"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Porte Real",
      description: "Porte Real APi Information",
    },
  },
  apis: [path.join(__dirname, "docs", "**", "*.yaml")],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

export default app;
