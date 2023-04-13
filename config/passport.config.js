import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

import UserModel from "../dao/models/users.js"
import { createHash, validatePassword } from "../utils/index.js"

const initPassport = () => {

    const options = {
        usernameField: "email",
        passReqToCallback: true,  
    }
    passport.use("register", new LocalStrategy(options, async (req, email, password, done) =>{
        const {
            body: { first_name, last_name, age },
        } = req;
        
        if (!first_name || !last_name || !age) {
            return done(new Error("Todos los campis deben venir en la solicitud"))
        }
        
        try {
            let user = await UserModel.findOne({email})

        if (user){
            console.log("user already registered")
            return done(null, false)
        }
            user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            });
        
            done(null, user)
        } catch (error) {
            return done(new Error("Error al obtener el usuario", error.message))
        }
    }))

    passport.use("login", new LocalStrategy({usernameField: "email"}, async (email, password, done) =>{

        try{
        const user = await UserModel.findOne({ email });

        if (!user) {
        return done(null, false)
    }     
        if (!validatePassword(password, user)) {
            return done(null, false)
    }
        done(null, user)
    }catch (error){
        return done(new Error("Error al obtener el usuario", error.message))
    }

    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })  

    passport.deserializeUser( async (id, done)=>{
        let user = await UserModel.findById(id)
        done(null, user)
    })   
}

export default initPassport