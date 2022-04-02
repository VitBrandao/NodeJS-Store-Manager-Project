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

const saleCreationVerification = async (body) => {
  for (let index = 0; index < body.length; index += 1) {
    const { productId, quantity } = body[index];
    const productIdVerification = middlewares.salesProductId(productId);
    if (productIdVerification !== 'ok') return productIdVerification;
  
    const quantityVerification = middlewares.quantityVerify(quantity);
    if (quantityVerification !== 'ok') return quantityVerification; 
  }

  // const create = await salesModels.postNewSale(body);
  return 0;
};

const verifyBeforeDelete = async (id) => {
  const result = await salesModels.deleteSale(id);
  return result;
};

const verifyBeforeUpdate = async (id, productId, quantity) => {
  const productIdVerification = middlewares.salesProductId(productId);
  if (productIdVerification !== 'ok') return productIdVerification;
  
  const quantityVerification = middlewares.quantityVerify(quantity);
  if (quantityVerification !== 'ok') return quantityVerification;

  const result = await salesModels.updateSale(id, productId, quantity);
  return result;
};

module.exports = {
  verifySales,
  saleCreationVerification,
  verifyBeforeDelete,
  verifyBeforeUpdate,
};
