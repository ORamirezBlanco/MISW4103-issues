Feature: Editar Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una Página y publicarla
          Volver a la lista de Páginas
          Abrir la Página y cambiar su estado a Draft
          Volver a la lista de Páginas
          Verificar que la Página editada cuente con el estado Draft

        Given I initialize test "04_editar_pagina_C"
        Given I navigate to editor "page"
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter title
        And I wait for 1 seconds
        And I get new id
        And I wait for 1 seconds
        And I publish element
        And I wait for 1 seconds
        And I go to list "Pages" "Pages"
        And I wait for 1 seconds
        And I click a new "page"
        And I wait for 1 seconds
        And I revert element "Published" to Draft
        And I wait for 1 seconds
        And I go to list "Pages" "Pages"
        And I wait for 1 seconds
        Then I check exists new page with this id, title and "DRAFT" state