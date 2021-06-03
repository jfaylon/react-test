const express = require("express");

const router = express.Router();

const productController = require("./controllers/product");

router.get("/", productController.test);
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.get("/products/:id", productController.getProduct);
router.post("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
