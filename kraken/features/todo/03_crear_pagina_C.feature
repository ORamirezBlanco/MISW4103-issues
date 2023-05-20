Feature: Crear Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una Página programada
          Volver a la lista de Páginas          
          Verificar que la Página cuente con el estado Scheduled

        Given I initialize test "03_crear_pagina_C"
        Given I navigate to editor "page"
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter title      
        And I wait for 1 seconds
        And I get new id
        And I wait for 1 seconds
        And I schedule element
        And I wait for 2 seconds
        And I go to list "Pages" "Pages"
        And I wait for 1 seconds
        Then I check exists new page with this id and "SCHEDULED" state