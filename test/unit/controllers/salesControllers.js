const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const oneSale = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

const expectedPutSale = {
  "saleId": 1,
  "itemUpdated": [
    {
      "productId": 1,
      "quantity": 6
    }
  ]
}

describe('Testes para a camada de Controllers de Sales', () => {
  describe('Verifica retorno de requisições GET /sales', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(salesModels, 'getAll')
        .resolves(allSales);
    });

    after(() => {
      salesModels.getAll.restore();
    });

    it('Ao retornar o objeto esperado, o status retornado é 200', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Ao retornar o objeto esperado, não retorna o status 500 de erro', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(500)).to.be.equal(false);
    });
  })

  describe('Verifica o retorno de requisições GET/sales/:id', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = 1;
      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(salesModels, 'getById')
        .resolves(oneSale);
    });

    after(() => {
      salesModels.getById.restore();
    });

    it('Ao retornar o objeto esperado, o status retornado é 200', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Ao retornar o objeto esperado, não retorna o status 500 de erro', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(500)).to.be.equal(false);
    });
  })

  // describe('Verifica o retorno para requisições PUT /sales', () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.body = [
  //       {
  //         "productId": 1,
  //         "quantity": 6
  //       }
  //     ];
  //     request.params = 1;
  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.send = sinon.stub()
  //       .returns();

  //     sinon.stub(salesServices, 'verifyBeforeUpdate')
  //       .resolves(expectedPutSale);
  //   });

  //   after(() => {
  //     salesServices.verifyBeforeUpdate.restore();
  //   });

  //   it('Ao passar um body válido, espera o devido retorno', async () => {
  //     const result = await salesController.updateSale(request, response);

  //     expect(result).to.be.equal(expectedPutSale);
  //   });

  //   it('O retorno da atualização do produto deve conter um id', async () => {
  //     const result = await salesController.updateSale(request, response);

  //     expect(result).to.have.property('saleId');
  //   });
  // })
})