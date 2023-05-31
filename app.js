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
import errorMiddleware from "./utils/MiddlewareError.js"

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
app.use(errorMiddleware)

initPassport();
app.use(passport.initialize());
app.use(passport.session());

//app.use("/", viewsRouter);
app.use("/api", apiRouter);
app.use("/", routers);

app.use((error, req, res, next) => {
  console.error("Error Middelware", error);
  res.status(error.status || 500).json({ message: error.message });
});
/*const auth = (req, res, next)=>{
    if (req.session.email == 'jose@maria.com' && req.session.admin) {
    return next()
    }
    res.status(401).send("Error de autenticacion")
}

app.post("/login", (req, res)=>{

    const{ body:{ email, password }} = req
    if(email !== 'jose@maria.com' || password !== '1234') {
        return res.send('login failed')
    }

    req.session.email = email
    req.session.admin = true
    res.send(`<h1>Login success!!</h1>`)
})
    
app.get("/public-endpoint", (req, res)=>{
    res.send("/public endpoint")
})
app.get("/private-endpoint", auth, (req, res) =>{
    res.send("private endpoint")
})


app.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (!error) {
            res.send("Logout OK")
        }else{
            res.send({status: "Logout Error", body: error})
        }
    })

})  */

export default app;
