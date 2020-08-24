const express = require("express");
const productController = require("../controllers/product");
const upload = require("../middleware/upload");
const route = express.Router();

route.get("/", productController.getProducts);
route.get("/:id", productController.getProductById);
route.delete("/delete/:id", productController.deleteProduct);
route.post("/create", upload.single('imgUrl'), productController.createProduct);
route.post("/update", upload.single('imgUrl'),productController.updateProduct);

module.exports = route;

