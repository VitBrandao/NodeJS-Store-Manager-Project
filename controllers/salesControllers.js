const salesModels = require('../models/salesModels');

const getAllSales = async (_req, res) => {
  try {
    const result = await salesModels.getAll();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesModels.getById(id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllSales,
  getSaleById, 
};
