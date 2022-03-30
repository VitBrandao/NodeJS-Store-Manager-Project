const express = require('express');

const app = express();

// não remover
require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
