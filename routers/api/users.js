import { Router } from "express";
import {get, create} from "../../controllers/users.js";
import CustomError from "../../utils/error.js";
import {generatorUserError} from "../../utils/MessageError.js"
import EnumsError from "../../utils/EnumsError.js"

const router = Router()

router.get("/", async (req, res, next)=>{
    try{
        const users = await get(req.query)
        res.status(200).json(users)
    } catch(error){
    next(error)
    }
})

router.post("/",async (req, res, next)=>{
    try{
        const user = await create(req.body)
        res.status(201).json(user)
    } catch(error){
    next(error)
    }
})

router.post("/mockingusers",async (req, res, next)=>{
    try{
        const user = await create(req.body)
        res.status(201).json(user)
    } catch(error){
    next(CustomError.createError({
        name: "User creating error",
        case: generatorUserError({
            firstName,  
            lastName,    
            email,       
            age, 
        }),
        message: "Error trying to create user",
        code: EnumsError.INVALID_TYPES_ERROR,
    }))
    }
})

export default router