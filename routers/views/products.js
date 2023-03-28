import { Router } from "express"


const router = Router()

router.get("/", (req, res)=>{
    const products = [
        {
            "title": "Patricio",
            "description": "Estrella",
            "code": "25",
            "price": "33258968",
            "stock": "Programacion",
            "category": 10,
        },
    ]
res.render("products", { products })

})

export default router