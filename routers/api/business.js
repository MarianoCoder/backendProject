import { Router } from "express";

import {get, create} from "../../controllers/business.js"

const router = Router()

router.get("/", async (req,res, next)=>{
    try{
        const businesses = await get(req.query)
        res.status(200).json(businesses)
    } catch(error){
    next(error)
    }
})

router.post("/",async (req, res, next)=>{
    try{
        const business = await create(req.body)
        res.status(201).json(business)
    } catch(error){
    next(error)
    }
})

export default router