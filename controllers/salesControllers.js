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

const returnMessage = (result) => {
  if (result.message.includes('length') || result.message.includes('greater')) {
    return 422;
  }
  if (result.message.includes('exists')) return 409;

  if (result.message.includes('found')) return 404;
  
  return 400;
};

const createSale = async (req, res) => {
  // const { productId, quantity } = req.body[0];
  const result = await salesServices.saleCreationVerification(req.body);
  if (result.message) {
    const status = returnMessage(result);
    return res.status(status).json(result);
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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  const result = await salesServices.verifyBeforeUpdate(id, productId, quantity);
  if (result.message) {
    const status = returnMessage(result);
    return res.status(status).json(result);
  }

  res.status(200).json(result);
};

module.exports = {
  getAllSales,
  getSaleById, 
  createSale,
  deleteSale,
  updateSale,
};
