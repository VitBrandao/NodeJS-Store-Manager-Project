const productsModels = require('../models/productsModels');

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsModels.getAll();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsModels.getById(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
