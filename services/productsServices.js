const productsModels = require('../models/productsModels');
const middlewares = require('../middlewares/middlewares');

const verifyProduct = async (id) => {
  const query = await productsModels.getById(id);
  
  if (!query || query.length === 0) {
    const message = { message: 'Product not found' };
    return message;
  }
  
  return query[0];
};

const productCreationVerify = async (name, quantity) => {
  const nameVerification = middlewares.productName(name);
  if (nameVerification !== 'ok') return nameVerification;

  const quantityVerification = middlewares.quantityVerify(quantity);
  if (quantityVerification !== 'ok') return quantityVerification;
};

module.exports = {
  verifyProduct,
  productCreationVerify,
};
