const Ventas=require('../models/Ventas');

exports.createVentas = async (req, res) => {
  const { 
    
    fechaCreacion,
    embalaje,
    despachoRuta,
    ubicacion,
    estado,
    ruta,
    medioPago,
    vendedor,
    cliente,
    carrito,  } = req.body;

  try {
    const newVentas = new Ventas({
        fechaCreacion,
        embalaje,
        despachoRuta,
        ubicacion,
        estado,
        ruta,
        medioPago,
        vendedor,
        cliente,
        carrito,
    });

    const VentasSaved = await newVentas.save();

    res.status(201).json(VentasSaved);
  } catch (error) {
    console.log(error);
   
  }
};

exports.getVentasById = async (req, res) => {
  try{
  const { ventasId } = req.params;

  const ventas = await Ventas.findById(ventasId);
  res.status(200).json(ventas);
  }
  catch
  (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getVentas = async (req, res) => {
  try{
  const ventas = await Ventas.find();
  return res.json(ventas);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateVentasById = async (req, res) => {
  try{
  const updatedVentas = await Ventas.findByIdAndUpdate(
    req.params.ventasId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedVentas);
  } catch(error) {
    console.log(error);

  }

};



exports.deleteVentasById = async (req, res) => {

  try {
  const { ventasId } = req.params;

  await Ventas.findByIdAndDelete(ventasId);

  // code 200 is ok too
  res.status(204).json();


}
catch (error) {
  console.log(error);
  return res.status(500).json(error);
}

};