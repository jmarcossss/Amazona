Feature: Calculo do tempo estimado de entrega
  As a usuário
  I want ver o tempo estimado de entrega de um pedido
  so that eu possa saber quando o pedido será entregue

Scenario: Ver tempo estimado de entrega de um pedido "Em trânsito"
    Given o usuário de email "mvsm3@mail.com" e senha "abcdef12" está logado
    And o usuário está na página "acompanhamento de pedido"
    And o pedido "1244" está "Em trânsito"
    Then o usuário consegue ver a estimativa para a entrega

  Scenario: Ver tempo estimado de entrega de um pedido "Confirmado"
    Given o usuário de email "mvsm3@mail.com" e senha "abcdef12" está logado
    And o usuário está na página "acompanhamento de pedido"
    And o pedido "1244" está "Confirmado"
    Then o usuário consegue ver a estimativa para a entrega

  Scenario: Ver tempo estimado de entrega de um pedido "Entregue"
    Given o usuário de email "mvsm3@mail.com" e senha "abcdef12" está logado
    And o usuário está na página "acompanhamento de pedido"
    And o pedido "1244" está "Entregue"
    Then o usuário consegue ver a estimativa para a entrega

  Scenario: Ver tempo estimado de entrega de um pedido "Cancelado"
    Given o usuário de email "mvsm3@mail.com" e senha "abcdef12" está logado
    And o usuário está na página "acompanhamento de pedido"
    And o pedido "1244" está "Cancelado"
    Then o usuário vê a mensagem de pedido cancelado

  Scenario: Ver tempo estimado de entrega de um pedido que não existe
    Given o usuário de email "mvsm3@mail.com" e senha "abcdef12" está logado
    And o usuário está na página "acompanhamento de pedido"
    And o pedido "1244" está "Produto inexistente"
    Then o usuário vê a mensagem de produto inexistente
