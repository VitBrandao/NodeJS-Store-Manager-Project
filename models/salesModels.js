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

module.exports = {
  getAll,
  getById,
};
