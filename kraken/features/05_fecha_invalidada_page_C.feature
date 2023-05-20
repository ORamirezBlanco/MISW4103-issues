Feature: Fecha invalida Página

@user1 @web
Scenario: Ingreso al sistema
          Creo una nueva Página
          Publicar la Página
          Verificar que la Página exista
          Editar la Página para que tenga un fecha de publicación inválida
          Verifico la existencia del mensaje de error

        Given I initialize test "05_fecha_invalidada_page_C"
        Given I navigate to editor "page"
        And I wait for 2 seconds
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter title
        And I wait for 1 seconds
        And I get new id
        And I wait for 1 seconds
        And I publish element
        And I wait for 2 seconds
        And I go to list "Pages" "Pages"
        And I wait for 1 seconds
        And I click a new "page"
        And I wait for 1 seconds
        And I open a lateral menu
        And I wait for 1 seconds
        And I enter invalid publish date
        And I wait for 1 seconds
        Then I check invalid publish date error message