const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

const notFoundMessage = { message: "Product not found" };

const productWithoutName = { "quantity": 10 };
const productWithInvalidName = { "name": "pro", "quantity": 100 };

const productWithoutQuantity = { "name": "produto" };
const productWithLowQuantity =  { "name": "produto", "quantity": -1 };

describe('Pesquisa de um id inexistente - função verifyProduct', () => {
  before(async () => {
    const expectedResult = [];

    sinon.stub(productsModels, 'getById').resolves(expectedResult);
  });

  after(async () => {
    productsModels.getById.restore();
  });

  it('Verifica se retorna uma mensagem', async () => {
    const result = await productServices.verifyProduct(5);

    expect(result).to.have.property('message');
  })

  it('Verifica se a mensagem de erro possui o texto correto', async () => {
    const result = await productServices.verifyProduct(5);

    expect(result.message).to.match(/Product not found/);
  })
})

describe('Verifica as validações de nome', () => {
  it('Para um body sem nome', async () => {
    const { name, quantity } = productWithoutName;
    const result = await productServices.productCreationVerify(name, quantity);

    expect(result.message).to.match(/"name" is required/);
  });

  it('Para um body cujo nome contém menos de 5 caracteres', async () => {
    const { name, quantity } = productWithInvalidName;
    const result = await productServices.productCreationVerify(name, quantity);

    expect(result.message).to.match(/"name" length must be at least 5 characters long/);
  });
});

describe('Verifica as validações de quantidade', () => {
  it('Para um body sem quantidade', async () => {
    const { name, quantity } = productWithoutQuantity;
    const result = await productServices.productCreationVerify(name, quantity);

    expect(result.message).to.match(/"quantity" is required/);
  });

  it('Para um body cuja quantidade é menor do que 1', async () => {
    const { name, quantity } = productWithLowQuantity;
    const result = await productServices.productCreationVerify(name, quantity);

    expect(result.message).to.match(/"quantity" must be greater than or equal to 1/);
  })
});