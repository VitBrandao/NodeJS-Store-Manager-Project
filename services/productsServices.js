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

  const create = await productsModels.postNewProduct(name, quantity);
  return create;
};

const productUpdateVerify = async (name, quantity, id) => {
  const nameVerification = middlewares.productName(name);
  if (nameVerification !== 'ok') return nameVerification;

  const quantityVerification = middlewares.quantityVerify(quantity);
  if (quantityVerification !== 'ok') return quantityVerification;

  const update = await productsModels.updateProduct(name, quantity, id);
  return update;
};

const verifyBeforeDelete = async (id) => {
  const result = await productsModels.deleteProduct(id);
  return result;
};

module.exports = {
  verifyProduct,
  productCreationVerify,
  productUpdateVerify,
  verifyBeforeDelete,
};
