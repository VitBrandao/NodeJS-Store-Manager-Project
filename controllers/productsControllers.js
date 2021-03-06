const productsModels = require('../models/productsModels');
const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsModels.getAll();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsServices.verifyProduct(id);
    if (result.message) {
      return res.status(404).send(result);
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const returnMessage = (result) => {
  if (result.message.includes('length') || result.message.includes('greater')) {
    return 422;
  }
  if (result.message.includes('exists')) return 409;

  if (result.message.includes('found')) return 404;
  
  return 400;
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsServices.productCreationVerify(name, quantity);
  if (result.message) {
    const status = returnMessage(result);
    return res.status(status).json(result);
  }

  return res.status(201).send(result);
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const result = await productsServices.productUpdateVerify(name, quantity, id);
  if (result.message) {
    const status = returnMessage(result);
    return res.status(status).json(result);
  }

  return res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsServices.verifyBeforeDelete(id);
  if (result.message) {
    return res.status(404).json(result);
  }
  
  return res.status(204).json();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
