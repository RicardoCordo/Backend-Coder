import sessionsRouter from './sessions.router.js'
import productRouter from './products.router.js'
import cartRouter from './cart.router.js'
import viewsRouter from './views.router.js'
import cookiesRouter from './cookies.router.js'
import views from '../chat/views.router.js'
import mokingRouter from '../../mock/product.mocking.router.js'
import roleAuth from '../../middlewares/roleAuth.middleware.js'
import logger from '../../routes/mongo/logger.router.js'
const router = app =>{
    app.use("/", viewsRouter);
	app.use("/cookies", cookiesRouter);
	app.use("/chat", roleAuth ('user'), views);
    app.use('/api/sessions', sessionsRouter);
    app.use ('/api/products', productRouter);
    app.use('/api/cart', cartRouter)
    app.use ('/mockingproducts', mokingRouter)
    app.use('/loggerTest', logger)
}


export default router