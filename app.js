import express from "express";
import apiRouter from "./routers/api/index.js";
import viewsRouter from "./routers/views/index.js";
import { init } from "./dao/db/mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
import routers from "./routers/index.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session"
import MongoStore from "connect-mongo"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await init();

const app = express();


app.use(expressSession(
    {store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongooptiones: {},
        ttl: 20,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized:false,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/static", express.static("./public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//app.use("/", viewsRouter);
app.use("/api", apiRouter);
app.use("/", routers);

const auth = (req, res, next)=>{
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

})


export default app;
