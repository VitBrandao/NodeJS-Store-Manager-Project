const express = require('express');

const app = express();
app.use(express.json());

const productsController = require('./controllers/productsControllers');
const salesController = require('./controllers/salesControllers');

// não remover
require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);
app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);

app.post('/products', productsController.createProduct);
app.post('/sales', salesController.createSale);
app.put('/products/:id', productsController.updateProduct);
app.put('/sales/:id', salesController.createSale);

app.delete('/products/:id', productsController.deleteProduct);

app.delete('/sales/:id', salesController.deleteSale);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
