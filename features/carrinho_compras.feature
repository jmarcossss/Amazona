Feature: Carrinho de compras
Situações em que o usuário escolhe os itens que deseja
comprar para poder efetuar o pagamento.

Scenario: Carrinho de compras vazio
Given o usuário "João" está na página de carrinho de compras
And o carrinho de compras está vazio
When o usuário "João" acessa a página de carrinho de compras
Then a mensagem "Seu carrinho está vazio." é exibida
And o usuário pode "Começar a comprar"
And a opção "Finalizar pedido" não é exibida na página

Scenario: Carrinho de compras abandonado
Given que o usuário "João" está na página principal
And o usuário "João" adiciona os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" ao carrinho de compras
When o usuário "João" sai do site
And depois volta ao site
Then os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" continuam presentes no carrinho de compras
And o usuário "João" pode continuar e concluir sua compra normalmente

Scenario: Carrinho de compras para finalização de pedido
Given que o usuário "João" está na página principal
And o usuário "João" adiciona os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" ao carrinho de compras
When o usuário "João" vai para a página do carrinho de compras
Then o usuário "João" consegue ver os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino"
And a opção "Finalizar pedido" é exibida e pronta para ser selecionada

Scenario: Finalização de pedido
Given que o usuário "João" está na página de carrinho de compras com os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" adicionados
When o usuário "João" seleciona "Finalizar pedido"
Then o usuário "João" é redirecionado para a página de finalização de pedido
And o usuário "João" preenche as informações de endereço de entrega e método de pagamento
When o usuário "João" conclui a compra
Then a mensagem "Obrigado, seu pedido foi concluído com sucesso!" é exibida
And o usuário "João" é redirecionado para a página de histórico de pedidos

Scenario: Carrinho de compras incompleto
Given que o usuário "João" está navegando no site
And o usuário "João" adiciona os itens "Camisa Puma - masculino" e "Camisa Adidas - masculino" ao seu carrinho de compras
And o usuário "João" não tem endereços cadastrados
When o usuário "João" vai para a página de finalização de pedido
And escolhe efetuar o pagamento
Then o usuário "João" é impedido de fazer a compra
And a mensagem "Desculpe, houve um problema ao concluir o seu pedido. Por favor, preencha o endereço de entrega e tente novamente." é exibida