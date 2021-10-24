const Product=require('../models/Products');

exports.createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      imgURL,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
   
  }
};

exports.getProductById = async (req, res) => {
  try{
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json(product);
  }
  catch
  (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getProducts = async (req, res) => {
  try{
  const products = await Product.find();
  return res.json(products);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateProductById = async (req, res) => {
  try{
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
  } catch(error) {
    console.log(error);

  }

};



exports.deleteProductById = async (req, res) => {

  try {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  // code 200 is ok too
  res.status(204).json();


}
catch (error) {
  console.log(error);
  return res.status(500).json(error);
}

};