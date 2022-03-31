const productsModels = require('../models/productsModels');

const verifyProduct = async (id) => {
  const query = await productsModels.getById(id);
  
  if (!query || query.length === 0) {
    const message = { message: 'Product not found' };
    return message;
  }
  
  return query[0];
};

module.exports = {
  verifyProduct,
};
