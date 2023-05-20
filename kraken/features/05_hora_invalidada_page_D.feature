Feature: Hora invalida Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una nueva Página en borrador
          Volver a la lista de borradores
          Verificar que la Página exista
          Editar la Página para que tenga un hora de publicación inválida
          Verificar la existencia del mensaje de error

        Given I initialize test "05_hora_invalidada_page_D"
        Given I navigate to editor "page"
        And I wait for 2 seconds
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter naughty title
        And I wait for 1 seconds
        And I get new id
        And I wait for 1 seconds
        And I go to list "Pages" "Pages"
        And I wait for 1 seconds
        And I click a new "page"
        And I wait for 1 seconds
        And I open a lateral menu
        And I wait for 1 seconds
        And I enter invalid publish hour
        And I wait for 1 seconds
        Then I check invalid publish hour error message