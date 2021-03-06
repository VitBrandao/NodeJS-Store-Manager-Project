const productName = (name) => {
  if (!name || name.length === 0) {
    const message = { message: '"name" is required' };
    return message;     
  }

  if (name.length < 5) {
    const message = { message: '"name" length must be at least 5 characters long' }; 
    return message;
  }

  return 'ok';
};

const quantityVerify = (quantity) => {
  if (parseInt(quantity, 10) < 1 || quantity === 0) {
    const message = { message: '"quantity" must be greater than or equal to 1' };
    return message; 
  }

  if (!quantity || quantity.length === 0) {
    const message = { message: '"quantity" is required' };
    return message; 
  }

  return 'ok';
};

const salesProductId = (productId) => {
  if (!productId || productId.length === 0) {
    const message = { message: '"productId" is required' };
    return message;
  }

  return 'ok';
};

const doesProductsExists = (allProducts, name) => {
  const findProduct = allProducts.find((product) => product.name === name);
  if (findProduct) {
    const message = { message: 'Product already exists' };
    return message;
  }
  return 'ok';
};

module.exports = {
  productName,
  quantityVerify,
  salesProductId, 
  doesProductsExists,
};
