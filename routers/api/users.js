import { Router } from "express";

import {get, create} from "../../controllers/users.js"

const router = Router()

router.get("/", async (req,res, next)=>{
    try{
        const users = await get(req.query)
        res.status(200).json(users)
    } catch(error){
    next(error)
    }
})

router.post("/",async (req,res)=>{
    try{
        const user = await create(req.body)
        res.status(201).json(user)
    } catch(error){
    next(error)
    }
})

export default router