Feature: Crear Página

@user1 @web
Scenario: Ingresar al sistema
          Ingresar a la vista de crear Página
          Ingresar el título
          Abrir el menú lateral Page settings        
          Verificar que se encuentre el botón de eliminar Página
        
        Given I initialize test "03_crear_pagina_D"
        Given I navigate to editor "page"
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter naughty title
        And I wait for 1 seconds
        And I open a lateral menu
        And I wait for 1 seconds 
        Then I check exists delete button