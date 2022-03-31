const connection = require('./connection');

const getAll = async () => {
  const [allSales] = await connection.execute('SELECT * FROM sales');
  return allSales;
};

const getById = async (id) => {
  const [saleById] = await connection.execute('SELECT * FROM sales WHERE id = ?', [id]);
  return saleById;
};

module.exports = {
  getAll,
  getById,
};
