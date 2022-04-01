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

const createSale = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const result = await salesServices.saleCreationVerification(productId, quantity);
  if (result.message) {
    if (result.message.includes('greater')) {
      return res.status(422).json(result);
    }
    return res.status(400).json(result);
  }

  return res.status(201).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.verifyBeforeDelete(id);
  if (result.message) {
    return res.status(404).json(result);
  }

  return res.status(204).json();
};

module.exports = {
  getAllSales,
  getSaleById, 
  createSale,
  deleteSale,
};
