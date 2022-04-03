const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

const saleWithoutId = [{ "quantity": 2 }];
const saleWithoutQuantity = [{ "productId": 1 }];

describe('Testes para a camada Services de Sales', () => {
  describe('Verifica retornos da função verifySales', () => {
    before(async () => {
      const expectedResult = [];

      sinon.stub(salesModels, 'getById').resolves(expectedResult);
    });

    after(async () => {
      salesModels.getById.restore();
    });

    it('Pesquisa para um id inexistente', async () => {
      const result = await salesServices.verifySales(1);

      expect(result).to.have.property('message');
    });

    it('Verifica se a mensagem de erro possui o texto correto', async () => {
      const result = await salesServices.verifySales(1);

      expect(result.message).to.match(/Sale not found/);
    })
  })

  describe('Verifica as validações de productId', () => {
    it('Para um body sem productId', async () => {
      const { name, quantity } = saleWithoutId;
      const result = await salesServices.saleCreationVerification(saleWithoutId);

      expect(result.message).to.match(/"productId" is required/);
    });
  });

  describe('Verifica as validações de quantity', () => {
    it('Para um body sem productId', async () => {
      const { name, quantity } = saleWithoutQuantity;
      const result = await salesServices.saleCreationVerification(saleWithoutQuantity);

      expect(result.message).to.match(/"quantity" is required/);
    });
  });
})
