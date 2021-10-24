const express=require('express');
const router = express.Router();
const { createVentas,getVentasById,getVentas,updateVentasById,deleteVentasById } = require('../controllers/ventas');
const { protect } = require("../middleware/auth");

router.route("/").get( protect,getVentas );
router.route("/:ventasId").get(getVentasById);

router.route("/").post(protect, createVentas);

  router.route("/:ventasId").put(protect, updateVentasById);
  
  router.route("/:ventasId").delete(protect, deleteVentasById);
  


module.exports=router;