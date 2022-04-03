const sinon = require('sinon');
const { expect } = require('chai');

const productsControllers = require('../../../controllers/productsControllers');
const productsModels = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

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

const postExpectedReturn = { "id": 1, "name": "produto", "quantity": 10 };
const putExpectedReturn = { "id": 1, "name": "produto", "quantity": 15 };
const notFoundMessage = { "message": "Product not found" };

describe('Testes para a camada de Controllers de Products', () => {
  describe('Verifica o retorno correto de status para requisições GET', () => {
    const response = {};
    const request = {};

    before(() => {
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

    it('Ao retornar o objeto esperado, o status retornado é 200', async () => {
      await productsControllers.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Ao retornar o objeto esperado, não retorna o status 500 de erro', async () => {
      await productsControllers.getAllProducts(request, response);

      expect(response.status.calledWith(500)).to.be.equal(false);
    });
  });

  describe('Verifica o retorno correto de status para requisições GET/:id', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = 1;
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'verifyProduct')
        .resolves(product);
    });

    after(() => {
      productsServices.verifyProduct.restore();
    });

    it('Ao retornar o objeto esperado, o status retornado é 200', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Ao retornar o objeto esperado, não retorna o status 500 de erro', async () => {
      await productsControllers.getProductById(request, response);

      expect(response.status.calledWith(500)).to.be.equal(false);
    });
  });

  describe('Verifica o retorno para requisições POST válidas', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { "name": "produto", "quantity": 15 };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsServices, 'productCreationVerify')
        .resolves(postExpectedReturn);
    });

    after(() => {
      productsServices.productCreationVerify.restore();
    });

    it('Ao passar um body válido, espera o devido retorno', async () => {
      await productsControllers.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Verifica o retorno para requisições POST não-válidas', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { "name": "produto", "quantity": 10 };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsControllers, 'createProduct')
        .resolves(notFoundMessage);
    });

    after(() => {
      productsControllers.createProduct.restore();
    });

    it('Ao passar um body inválido, espera o devido retorno', async () => {
      const result = await productsControllers.createProduct(request, response);

      expect(result).to.be.equal(notFoundMessage);
    });
  });

  describe('Verifica o retorno para requisições PUT válidas', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { "name": "produto", "quantity": 15 };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(productsControllers, 'updateProduct')
        .resolves(putExpectedReturn);
    });

    after(() => {
      productsControllers.updateProduct.restore();
    });

    it('Ao passar um body válido, espera o devido retorno', async () => {
      const result = await productsControllers.updateProduct(request, response);

      expect(result).to.be.equal(putExpectedReturn);
    });

    it('O retorno da atualização do produto deve conter um id', async () => {
      const result = await productsControllers.updateProduct(request, response);

      expect(result).to.have.property('id');
    });

    it('O retorno da atualização do produto deve conter o atributo name', async () => {
      const result = await productsControllers.updateProduct(request, response);

      expect(result).to.have.property('name');
    });

    it('O retorno da atualização do produto deve conter o atributo quantity', async () => {
      const result = await productsControllers.updateProduct(request, response);

      expect(result).to.have.property('quantity');
    });
  });
})