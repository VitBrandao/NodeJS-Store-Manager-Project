const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModels = require('../../../models/productsModels');

const allProducts = [
  {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "produto B",
    "quantity": 20
  }
];

const product = {
  "id": 1,
  "name": "produto A",
  "quantity": 10
};

const newProduct = {
  "id": 1,
  "name": "produto N",
  "quantity": 40
};

const notFoundMessage = { "message": "Product not found" };

describe('Retorno correto de requisições GET /products', () => {
  before(async () => {
    const expectedResult = [allProducts];

    sinon.stub(connection, 'execute').resolves(expectedResult);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Verifica o retorno da lista completa de produtos', async () => {
    const result = await productsModels.getAll();

    expect(result).to.be.equal(allProducts);
  })

  it('Verifica o tamanho esperado da lista completa de produtos', async () => {
    const result = await productsModels.getAll();

    expect(result).to.have.lengthOf(2);
  })
});

describe('Retorno de requisições GET /products para informações inválidas', () => {
  before(async () => {
    const expectedResult = [];

    sinon.stub(connection, 'execute').resolves(expectedResult);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Verifica o retorno de getAll para dados inválidos', async () => {
    const result = await productsModels.getAll();

    expect(result).to.be.equal(undefined);
  })
});

describe('Retorno de requisições GET /products/:id para id válido', () => {
  before(async () => {
    const expectedResult = [product];

    sinon.stub(connection, 'execute').resolves(expectedResult);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Verifica o retorno de um único produto por Id', async () => {
    const result = await productsModels.getById(1)

    expect(result).to.be.equal(product);
  });

  it('Verifica se o retorno possui o atributo ID', async () => {
    const result = await productsModels.getById(1)

    expect(result).to.have.a.property('id');
  });

  it('Verifica se o retorno possui o atributo NAME', async () => {
    const result = await productsModels.getById(1)

    expect(result).to.have.a.property('name');
  });

  it('Verifica se o retorno possui o atributo QUANTITY', async () => {
    const result = await productsModels.getById(1)

    expect(result).to.have.a.property('quantity');
  });
});

describe('Retorno de requisições GET /products/:id para id inválido', () => {
  before(async () => {
    const expectedResult = [];

    sinon.stub(connection, 'execute').resolves(expectedResult);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('Verifica o retorno de getById para dados inválidos', async () => {
    const result = await productsModels.getById(1);

    expect(result).to.be.equal(undefined);
  })
});

// describe('Retorno de requisições POST /products', () => {
//   before(async () => {
//     const expectedResult = [newProduct];

//     sinon.stub(connection, 'execute').resolves(expectedResult);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });

//   it('Verifica o cadastro de um produto válido', async () => {
//     const result = await productsModels.postNewProduct(newProduct);

//     expect(result).to.be.equal(newProduct);
//   })
// });
