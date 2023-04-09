const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, by, element } = require('protractor');
const assert = require('assert');

Given(
  'que o usuário de CPF {string} está cadastrado no sistema',
  async (cpf: string) => {}
);

Given('o usuário está na página de {string}', async (screen: string) => {
  await browser.get('/authentication/sign-up');
});

When(
  'o usuário adiciona o nome {string}, CPF {string}, email {string} e senha {string}',
  async (name: string, cpf: string, email: string, password: string) => {
    const nameInput = element(by.css('.name input'));
    await nameInput.sendKeys(name);

    const cpfInput = element(by.css('.CPF input'));
    await cpfInput.sendKeys(cpf);

    const emailInput = element(by.css('.email input'));
    await emailInput.sendKeys(email);

    const passwordInput = element(by.css('.password input'));
    await passwordInput.sendKeys(password);
  }
);

When('o usuário escolhe ir para a {string}', async (button: string) => {
  const buttonElement = element(by.css(`.next-button button`));

  await buttonElement.click();
});

Then(
  'o usuário recebe uma mensagem de aviso {string}',
  async (message: string) => {
    const messageElement = element(
      by.css('.mdc-snackbar .mat-mdc-snack-bar-label')
    );
    const messageText = await messageElement.getText();

    assert.ok(messageText.includes(message));

    await browser.sleep(1000);
  }
);
