const productsModels = require('../models/productsModels');
const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsModels.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.verifyProduct(id);
    if (result.message) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsServices.productCreationVerify(name, quantity);
  if (result.message) {
    if (result.message.includes('length') || result.message.includes('greater')) {
      return res.status(422).json(result);
    }
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
