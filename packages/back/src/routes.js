const express = require("express");
const upload = require("./config/fileUploader");
const CategoryController = require("./controllers/CategoryController");
const ProductController = require("./controllers/ProductController");
const StoreController = require("./controllers/UserController");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Hello World");
});

router.post("/stores", upload.single("logo"), StoreController.store);
router.get("/stores", StoreController.index);
router.get("/stores/:id", StoreController.show);

router.post("/categories", upload.single("image"), CategoryController.store);
router.post("/products", upload.single("image"), ProductController.store);

module.exports = router;
