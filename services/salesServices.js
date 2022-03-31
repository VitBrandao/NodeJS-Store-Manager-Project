const salesModels = require('../models/salesModels');

const verifySales = async (id) => {
  const query = await salesModels.getById(id);
  
  if (!query || query.length === 0) {
    const message = { message: 'Sale not found' };
    return message;
  }

  return query;
};

module.exports = {
  verifySales,
};
