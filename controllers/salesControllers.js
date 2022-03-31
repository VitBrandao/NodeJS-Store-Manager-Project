const salesModels = require('../models/salesModels');
const salesServices = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  try {
    const result = await salesModels.getAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesServices.verifySales(id);
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
  getAllSales,
  getSaleById, 
};
