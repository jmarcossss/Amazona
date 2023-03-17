Feature: Carrinho de compras
As a usuário
I want escolher os itens que desejo comprar
So that eu possa efetuar o pagamento e receber meus produtos

Scenario: Carrinho de compras vazio
Given que o usuário de CPF "12989087064" está na página "carrinho de compras"
And o carrinho de compras está vazio
When o usuário de CPF "12989087064" acessa a página "carrinho de compras"
Then o usuário  de CPF "12989087064"  visualiza a mensagem "Seu carrinho está vazio." com a opção de "começar a comprar"
And a opção de "finalizar pedido" não é exibida na página

Scenario: Carrinho de compras abandonado
Given que o usuário  de CPF "12989087064" está na página "carrinho de compras" com os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" adicionados
When o usuário de CPF "12989087064" sai do site
And  o usuário de CPF "12989087064" acessa a página "carrinho de compras"
Then o usuário de CPF "12989087064" visualiza os itens "Camisa Puma - masculino", "Camisa Adidas - masculino" e a opção de "finalizar pedido"

Scenario: Finalização de pedido
Given que o usuário com CPF "12989087064" está na página "carrinho de compras" com os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" adicionados
And o usuário de CPF "12989087064" não tem endereço
When o usuário de CPF "12989087064" escolhe "finalizar pedido"
Then o usuário de CPF "12989087064" é redirecionado para a página "finalização de pedido"
When o usuário de CPF "12989087064" preenche as informações de "endereço"
And o usuário de CPF "12989087064" escolhe "confirmar pedido"
Then o usuário de CPF "12989087064" recebe a mensagem "Obrigado, seu pedido foi concluído com sucesso!"
And o usuário de CPF "12989087064" é redirecionado para a página "histórico de pedidos"

Scenario: Finalização de pedido sem endereço cadastrado
Given que o usuário com CPF "12989087064" está na página "carrinho de compras" com os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" adicionados
And o usuário de CPF "12989087064" não tem endereços cadastrados
When o usuário de CPF "12989087064" escolhe "finalizar pedido"
Then o usuário de CPF "12989087064" é redirecionado para a página "finalização de pedido"
And o usuário de CPF "12989087064" escolhe "confirmar pedido"
Then o usuário de CPF "12989087064" recebe uma mensagem "Desculpe, houve um problema ao concluir o seu pedido."