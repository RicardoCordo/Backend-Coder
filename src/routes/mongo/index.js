import { Router } from 'express';
import sessionsRouter from './sessions.router.js'
import productRouter from './products.router.js'
import cartRouter from './cart.router.js'

const router = Router ()

router.use('/sessions', sessionsRouter);
router.use ('/products', productRouter);
router.use('/cart', cartRouter)

export default router