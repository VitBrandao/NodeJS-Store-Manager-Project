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

module.exports = {
  getAllProducts,
  getProductById,
};
