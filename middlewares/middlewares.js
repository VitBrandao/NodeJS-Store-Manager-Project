const productName = (name) => {
  if (!name || name.length === 0) {
    const message = { message: 'name is required' };
    return message;     
  }

  if (name.length < 5) {
    const message = { message: 'name length must be at least 5 characters long' }; 
    return message;
  }

  return 'ok';
};

const productQuantity = (quantity) => {
  if (!quantity || quantity.length === 0) {
    const message = { message: 'quantity is required' };
    return message; 
  }
};

module.exports = {
  productName,
  productQuantity,
};
