const salesModels = require('../models/salesModels');
const middlewares = require('../middlewares/middlewares');

const verifySales = async (id) => {
  const query = await salesModels.getById(id);
  
  if (!query || query.length === 0) {
    const message = { message: 'Sale not found' };
    return message;
  }

  return query;
};

const saleCreationVerification = async (productId, quantity) => {
  const productIdVerification = middlewares.salesProductId(productId);
  if (productIdVerification !== 'ok') return productIdVerification;

  const quantityVerification = middlewares.quantityVerify(quantity);
  if (quantityVerification !== 'ok') return quantityVerification;
};

module.exports = {
  verifySales,
  saleCreationVerification,
};
