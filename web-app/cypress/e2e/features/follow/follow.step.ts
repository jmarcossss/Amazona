import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { expect } from 'chai';

const orderStatus = {
  "msg": "GET /api/order-status",
  "msgCode": "success",
  "code": 200,
  "data": [
    {
      "id": "f307102d-698b-4ad5-adf6-de7281243583",
      "status": "in transit"
    },
    {
      "id": "a067121b-73ac-4d45-8137-158f58dea0a1",
      "status": "delivered"
    },
    {
      "id": "8bbb7b46-17d6-4df3-8171-0003814e3812",
      "status": "confirmed"
    },
    {
      "id": "0fc0ea4f-840a-4a45-b657-1a364fb4fe72",
      "status": "canceled"
    }
  ]
};

const orderIds: { [key: string]: string } = {
  'Em trânsito': 'f307102d-698b-4ad5-adf6-de7281243583',
  'Confirmado': '8bbb7b46-17d6-4df3-8171-0003814e3812',
  'Entregue': 'a067121b-73ac-4d45-8137-158f58dea0a1',
  'Cancelado': '0fc0ea4f-840a-4a45-b657-1a364fb4fe72',
};

Given(
  'o usuário de email {string} e senha {string} está logado',
  (cpf: string, senha: string) => {
    cy.visit('/');

    cy.get('input[placeholder="Informe o e-mail ou usuário"]').type(cpf);
    cy.get('input[placeholder="Informe sua senha"]').type(senha);
    cy.get('app-button[label="ENTRAR"]').click();
  }
);

Given(
  'o usuário está na página {string}',
  (page: string) => {
    if (page === 'acompanhamento de pedido') {
      const order = orderStatus.data.find(o => o.status === 'in transit');
      cy.visit(`/follow/${order.id}`);
    } else {
      cy.visit('/');
    }
  }
);


Given(
  'o pedido {string} está {string}',
  (orderNumber: string, orderStatus: string) => {
    const orderId = orderIds[orderStatus] || 'nonexistent';
    const url = `http://localhost:4200/follow/${orderId}`;
    cy.visit(url);

    cy.intercept('GET', '/api/order-status', (req) => {
      req.reply((res) => {
        const order = res.body.data.find((o: any) => o.id === orderId);
        expect(order.status).to.equal(orderStatus);
      });
    });
  }
);

Then('o usuário consegue ver a estimativa para a entrega', () => {
  cy.get('p:not(.status)')
    .should('contain', 'Estimativa para entrega em 14 dias')
    .and('be.visible');
});

Then('o usuário vê a mensagem de pedido cancelado', () => {
  cy.get('p:not(.status)')
    .should('contain', 'Produto inexistente/cancelado, não há estimativa para entrega')
    .and('be.visible');
});

Then('o usuário vê a mensagem de produto inexistente', () => {
  cy.get('p:not(.status)')
    .should('contain', 'Produto inexistente/cancelado, não há estimativa para entrega')
    .and('be.visible');
});
