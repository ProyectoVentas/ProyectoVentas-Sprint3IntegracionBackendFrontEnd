const mongoose=require('mongoose');

const VentaSchema = new mongoose.Schema(
  {
    
    fechaCreacion:String,
    embalaje:String,
    despachoRuta: String,
    ubicacion: String,
    estado: String,
    ruta: String,
    medioPago:String,
    vendedor:String,
    cliente:String,
    carrito:Object




  },
  {
    timestamps: true,
    versionKey: false
  }
);

 const Venta= mongoose.model("Ventas", VentaSchema);
 module.exports = Venta;