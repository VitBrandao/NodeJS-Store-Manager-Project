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

const mountUpdatedObject = (id, prodId, quant) => {
  const object = {
    saleId: id,
    itemUpdated: [
      {
        productId: prodId,
        quantity: quant,
      },
    ],
  };
  return object;
};

const updateSale = async (id, productId, quantity) => {
  const find = await findSale(id);
  if (find.message) return find;

  await connection.execute(
    'UPDATE sales_products SET product_id = ? WHERE sale_id = ?',
    [productId, id],
  );

  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ?',
    [quantity, id],
  );

  const returnedObject = mountUpdatedObject(id, productId, quantity);
  return returnedObject;
};

const insertSale = async (array, index, newSaleId) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [newSaleId, array[index].prodId, array[index].quant],
  );
  if (array.length === 2) {
    const newIndex = 1;
    insertSale(array, newIndex, newSaleId);
  }
};

const mountNewObject = (array, newSaleId) => {
  const object = {
    id: newSaleId,
    itemsSold: [],
  };

  for (let index = 0; index < array.length; index += 1) {
    const { prodId, quant } = array[index];
    const insertObject = {
      productId: prodId,
      quantity: quant,
    };
    object.itemsSold.push(insertObject);
  }
  return object;
};

const postNewSale = async (body) => {
  const dataArray = [];
  for (let index = 0; index < body.length; index += 1) {
    const { productId, quantity } = body[index];
    const dataObject = {
      prodId: productId,
      quant: quantity,
    };
    dataArray.push(dataObject);
  }
  const [allSales] = await connection.execute('SELECT * FROM sales');
  const newSaleId = allSales.length + 1;
  await connection.execute(
    'INSERT INTO sales (id) VALUES (?)', [newSaleId],
  );
  const index = 0;
  await insertSale(dataArray, index, newSaleId);
  const finalObject = mountNewObject(dataArray, newSaleId);
  return finalObject;
};

module.exports = {
  getAll,
  getById,
  deleteSale,
  updateSale,
  postNewSale,
};
