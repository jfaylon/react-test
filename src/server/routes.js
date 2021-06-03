const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();

const productController = require("./controllers/product");

router.get("/", productController.test);
router.get("/products", productController.getAllProducts);
router.post("/products", upload.none(), productController.createProduct);
router.get("/products/:id", productController.getProduct);
router.post("/products/:id", upload.none(), productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
