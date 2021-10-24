const express=require('express');
const router = express.Router();
const { createProduct,getProducts,getProductById,updateProductById,deleteProductById } = require('../controllers/products');
const { protect } = require("../middleware/auth");

router.route("/").get( protect, getProducts);
router.route("/:productId").get(getProductById);

router.route("/").post(protect, createProduct);

  router.route("/:productId").put(protect, updateProductById);
  
  router.route("/:productId").delete(protect, deleteProductById);
  


module.exports=router;