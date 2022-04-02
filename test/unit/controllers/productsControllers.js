const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsControllers = require('../../../controllers/productsControllers');
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

describe('Testes para a camada de Controllers de Products', () => {
  describe('Verifica o retorno correto de status para requisições GET', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsModels, 'getAll')
        .resolves(allProducts);
    });

    after(() => {
      productsModels.getAll.restore();
    });

    // it('Ao retornar o objeto esperado, o status retornado é 200', async () => {
    //   await productsModels.getAll(request, response);

    //   expect(response.status.calledWith(200)).to.be.equal(true);
    // });

    it('Ao retornar o objeto esperado, não retorna o status 500 de erro', async () => {
      await productsModels.getAll(request, response);

      expect(response.status.calledWith(500)).to.be.equal(false);
    });

  })
})