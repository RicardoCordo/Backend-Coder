import { Router } from "express";
import { generateProduct } from "./product.mock.js";
const router = Router();

router.get("/", (req, res) => {
    const product = []
    for (let i = 0; i <= 100; i++) {
        product.push(generateProduct())
    }
    res.send(product)
})

export default router