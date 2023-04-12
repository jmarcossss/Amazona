import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
const dict: { [key: string]: string } = {
  'inicial': '/',
  'histórico de pedidos': '/order/history',
  '101': 'b9c4a338-e19e-4bfa-bc83-45171017407c',
  '102': '96167110-8224-4729-b2f2-5814f11d3126',
};
const users: { [key: string]: string[] } = {
  '12989087064': ['acrucha', 'abcdef12'],
  '00342153411': ["rafinha", "1234567a"]
}
beforeEach(() => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.reload()
})
function logar(cpf: string): void{
  cy.window().then((win) => {
    win.localStorage.removeItem('user');
  });
  cy.visit('/authentication/sign-in');
  cy.get('input[placeholder="Informe o e-mail ou usuário"]').type(users[cpf][0]);
  cy.get('input[placeholder="Informe sua senha"]').type(users[cpf][1]);
  cy.contains('ENTRAR').click()
}

Given(
  'o usuário de CPF {string} está na página {string}',
  (cpf: string, page: string) => {
    logar(cpf)
    cy.visit(dict[page]);
  }
);
Given(
  'o usuário de CPF {string} está na página {string} com o filtro para o produto {string}',
  (cpf: string, page: string, nomeProduto: string) => {
    logar(cpf)
    cy.visit(dict[page]);
    cy.get('input[placeholder="Número do pedido ou nome do produto"]').type(nomeProduto);
    cy.contains('BUSCAR').click()
  }
);
When(
  'o usuário acessa a página {string}',
  (page: string) => {
    cy.visit(dict[page]);
  }
);
When(
  'o usuário escolher {string}',
  (opcao: string) => {
    if(opcao==="limpar filtros"){
      cy.contains('LIMPAR').click()
    }
  }
);
When(
  'o usuário filtra por {string} os pedidos para o produto {string}',
  (tipo: string, nomeProduto: string) => {
    if(tipo==="produto"){
      cy.get('input[placeholder="Número do pedido ou nome do produto"]').type(nomeProduto);
      cy.contains('BUSCAR').click()
    }
  }
);
When(
  'o usuário filtra por {string} os pedidos para o intervalo de datas {string} à {string}',
  (tipo: string, data1: string, data2) => {
    if(tipo==="data"){
      cy.get('input[placeholder="começo"]').type(data1);
      cy.get('input[placeholder="fim"]').type(data2);
      cy.contains('BUSCAR').click()
    }
  }
);
When(
  'o usuário filtra por {string} os pedidos para {string} e {string}',
  (tipo: string, status1: string, status2) => {
    if(tipo==="status"){
      cy.contains('status').click()
      cy.contains(status1).click()

      cy.contains('status').click()
      cy.contains(status2).click()
      cy.contains('BUSCAR').click()
    }
  }
);
Then(
  'o usuário visualiza os pedidos de número {string} e {string}',
  (pedido1: string, pedido2: string) => {
    cy.get(`[id=${dict[pedido1]}]`).should('exist')
    cy.get(`[id=${dict[pedido2]}]`).should('exist')
  }
);
Then(
  'o usuário visualiza uma mensagem {string}',
  (mensagem: string) => {
    cy.contains(mensagem).should('exist')
  }
);
Then(
  'o usuário visualiza o pedido de número {string}',
  (pedido1: string) => {
    cy.get(`[id=${dict[pedido1]}]`).should('exist')
  }
);