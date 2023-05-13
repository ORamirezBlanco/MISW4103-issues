Feature: Crear una Página

@user1 @web
Scenario: Ingreso al sistema
          Creo una nueva página en borrador
          Verifico que exista la pagina creada como borrador
Given I initialize test "03_crear_pagina_A"
Given I navigate to editor "page" 
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter title
And I wait for 1 seconds
And I get new id
And I wait for 1 seconds
And I go to list "Pages" "Pages"
And I wait for 1 seconds
Then I check exists new page with this id and "DRAFT" state
  