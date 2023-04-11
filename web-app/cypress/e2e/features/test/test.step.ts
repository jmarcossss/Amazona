import { Given } from 'cypress-cucumber-preprocessor/steps';

Given(
  'que o usuário de CPF {string} está cadastrado no sistema',
  (cpf: string) => {
    cy.log(cpf);
    cy.visit('/');

    cy.get('input[placeholder="Informe o e-mail ou usuário"]').type(cpf);
    cy.log('Usuário informado');
  }
);
