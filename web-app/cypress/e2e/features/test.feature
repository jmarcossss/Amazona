Feature: Exibir histórico de pedidos do usuário
  As a usuário
  I want desejo visualizar todo o histórico de pedidos ativos, concluídos e cancelados, bem como ter a possibilidade de filtrá-los por nome, status, código do pedido e data.
  so that eu possa ter um maior controle sobre meus pedidos.

Scenario: Visualizar histórico de pedidos
Given o usuário de CPF "12989087064" está na página "inicial"
When o usuário acessa a página "histórico de pedidos"
Then o usuário visualiza os pedidos de número "101" e "102"

Scenario: Visualizar histórico de pedidos - Lista vazia
Given o usuário de CPF "00342153411" está na página "inicial"
When o usuário acessa a página "histórico de pedidos"
Then o usuário visualiza uma mensagem "Nenhum pedido encontrado"

Scenario: Buscar histórico de pedidos por nome do produto
Given o usuário de CPF "12989087064" está na página "histórico de pedidos"
When o usuário filtra por "produto" os pedidos para o produto "camisa"
Then o usuário visualiza o pedido de número "101"

Scenario: Limpar filtros
Given o usuário de CPF "12989087064" está na página "histórico de pedidos" com o filtro para o produto "camisa"
When o usuário escolher "limpar filtros"
Then o usuário visualiza os pedidos de número "101" e "102"

Scenario: Filtrar histórico de pedidos por data
Given o usuário de CPF "12989087064" está na página "histórico de pedidos"
When o usuário filtra por "data" os pedidos para o intervalo de datas "01/29/2022" à "01/29/2024"
Then o usuário visualiza o pedido de número "101"

Scenario: Filtrar histórico de pedidos por múltiplos status
Given o usuário de CPF "12989087064" está na página "histórico de pedidos"
When o usuário filtra por "status" os pedidos para "Confirmado" e "Entregue"
Then o usuário visualiza os pedidos de número "101" e "102"