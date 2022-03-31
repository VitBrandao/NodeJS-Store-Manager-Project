const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
};

const getById = async (id) => {
  const [productById] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return productById;
};

module.exports = {
  getAll,
  getById,
};
