Feature: Cadastro e manuntenção de usuários
As a usuário
I want to conseguir me cadastrar no sistema
So that eu possa atualizar e deletar minhas informações

Scenario: Cadastro com CPF já utilizado
Given que o usuário de CPF "12989087064" está cadastrado no sistema
And o usuário está na página de "cadastro dados pessoais"
When o usuário adiciona o nome "Clara Acrucha", CPF "12989087064", email "acrucha@mail.com" e senha "abcdef12"
And o usuário escolhe ir para a "próxima etapa"
Then o usuário recebe uma mensagem de aviso "Usuário já cadastrado"
