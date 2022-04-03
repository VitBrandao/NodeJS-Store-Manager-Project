const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');

const entryAllSales = [
  {
    "sale_id": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "product_id": 1,
    "quantity": 2
  },
  {
    "sale_id": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "product_id": 2,
    "quantity": 2
  }
];

// const returnedAllSales =   [
//   {
//     "saleId": 1,
//     "date": "2021-09-09T04:54:29.000Z",
//     "productId": 1,
//     "quantity": 2
//   },
//   {
//     "saleId": 1,
//     "date": "2021-09-09T04:54:54.000Z",
//     "productId": 2,
//     "quantity": 2
//   }
// ];

const saleById = [
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

describe('Testes para a camada de Models de Sales', () => {
  describe('Verifica o retorno para requisições GET/sales', () => {
    before(async () => {
      const expectedResult = [entryAllSales];
      
      sinon.stub(connection, 'execute').resolves(expectedResult);
    });

    after(async () => {
      connection.execute.restore();
    });

    // it('Espera o retorno da lista completa de vendas', async () => {
    //   const result = await salesModels.getAll();

    //   expect(result).to.be.equal(returnedAllSales);
    // })

    it('Espera que o retorno seja uma lista cujo length é 2', async () => {
      const result = await salesModels.getAll();

      expect(result).to.have.length(2);
    });
  });

  describe('Verifica o retorno para requisições GET/sales/:id', () => {
    before(async () => {
      const expectedResult = [saleById];
      
      sinon.stub(connection, 'execute').resolves(expectedResult);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Espera que o retorno seja uma lista cujo length é 2', async () => {
      const result = await salesModels.getById();

      expect(result).to.have.length(2);
    });
  });
})