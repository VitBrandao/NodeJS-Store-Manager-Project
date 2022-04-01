const connection = require('./connection');
const middlewares = require('../middlewares/middlewares');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
};

const getById = async (id) => {
  const [productById] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return productById;
};

const postNewProduct = async (name, quantity) => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM products',
  );

  const alreadyExists = middlewares.doesProductsExists(allProducts, name);
  if (alreadyExists !== 'ok') return alreadyExists;

  await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  const [findNewProduct] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return findNewProduct;
};

const updateProduct = async (name, quantity, id) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  await connection.execute(
    'UPDATE products SET quantity = ? WHERE id = ?',
    [quantity, id],
  );

  const [findProduct] = connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return findProduct;
};

module.exports = {
  getAll,
  getById,
  postNewProduct,
  updateProduct,
};
