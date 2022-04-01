const connection = require('./connection');

const serializeAll = (authorData) => authorData.map((item) => ({
  saleId: item.sale_id,
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
}));

const getAll = async () => {
  const queryString = 'SELECT sale_id, date, product_id, quantity';
  const [allSales] = await connection.execute(
    `${queryString} FROM sales AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id`,
  );
  return serializeAll(allSales);
};

const serializeOne = (authorData) => authorData.map((item) => ({
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
}));

const getById = async (id) => {
  const queryString = 'SELECT date, product_id, quantity FROM sales';
  const [saleById] = await connection.execute(
    `${queryString} AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id WHERE s.id = ?`,
    [id],
  );
  return serializeOne(saleById);
};

const findSale = async (id) => {
  const [find] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );

  if (!find || find.length === 0 || find === undefined) {
    const message = { message: 'Sale not found' };
    return message;
  }
  return 'ok';
};

const deleteSale = async (id) => {
  const find = await findSale(id);

  if (find.message) return find;

  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id], 
  );

  return 'deleted';
};

// const postNewSale = async (productId, quantity) => {
//   const [allSales] = await connection.execute('SELECT * FROM sales_products');
//   const newSaleId = allSales.length + 1;
//   await connection.execute(
//     'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
//     [newSaleId, productId, quantity],
//   );
  
//   const [newSale] = await connection.execute(
//     'SELECT * FROM sales_products WHERE sale_id = ?',
//     [newSaleId],
//   );
  
//   return newSale;
// };

module.exports = {
  getAll,
  getById,
  deleteSale,
  // postNewSale,
};
