import { Router } from "express";
import productModel from "../../dao/mongo/models/product.js";

const router = Router();

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register');
})

router.get("/home", async (req, res) => {
  try {
    return await res.status(200).render("home", {
      documentTitle: "Home",
    });
  } catch (err) {
    return await res.status(500).json({ error: err.message });
  };
});

router.get("/products", async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, payload, ...rest } =
    await productModel.paginate({}, { page, limit: 5, lean: true });
  const products = docs;
  res.render("products", {
    products,
    page: rest.page,
    payload: products,
    totalPages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,

  });
});

router.get("/chat", (req, res) => {
  try {
    return res.status(200).render("chat", {
      documentTitle: "Chat",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
});

router.get("/realtimeproducts", (req, res) => {
  try {
    return res.status(200).render("realTimeProducts", {
      documentTitle: "Socket",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  };
});



export default router;

