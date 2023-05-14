Feature: Borrar Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una Página y publicarla
          Volver a la lista de Páginas
          Abrir la Página y el menú lateral
          Dar clic en el botón Delete page
          Dar clic en el modal al botón Delete
          Verificar que no exista la Página

        Given I initialize test "05_borrar_pagina_C"
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
        And I open a lateral menu
        And I wait for 1 seconds
        And I delete element
        And I wait for 1 seconds
        And I confirm delete element
        And I wait for 1 seconds
        Then I check not exists a new "page"