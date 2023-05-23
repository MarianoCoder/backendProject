import { Router } from "express";

<<<<<<< HEAD
import { get, create, resolve } from "../../controllers/orders.js";
=======
import {get, create, resolve} from "../../controllers/orders.js"
>>>>>>> 1d845590fe7b2844a0b3e0d5b6439eb81f212db7

const router = Router();

<<<<<<< HEAD
router.get("/", async (req, res, next) => {
  try {
    const orders = await get(req.query);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const order = await create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/resolve", async (req, res) => {
  try {
    const order = await resolve(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
=======
router.get("/", async (req, res, next)=>{
    try{
        const orders = await get(req.query)
        res.status(200).json(orders)
    } catch(error){
    next(error)
    }
})

router.post("/",async (req, res, next)=>{
    try{
        const order = await create(req.body)
        res.status(201).json(order)
    } catch(error){
    next(error)
    }
})

router.put("/:id/resolve",async (req, res, next)=>{
    try{
        const order = await resolve(req.params.id, req.body)
        res.status(200).json(order)
    } catch(error){
    next(error)
    }
})



export default router
>>>>>>> 1d845590fe7b2844a0b3e0d5b6439eb81f212db7
