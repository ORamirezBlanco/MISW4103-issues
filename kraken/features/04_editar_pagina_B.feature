Feature: Editar una Página

@user1 @web
Scenario: Ingreso al sistema
          Creo una nueva página en borrador con caracteres especiales
          Vuelvo al listado de página
          Navego a la nueva página
          Coloco autor inexistente
          Voy a la lista de páginas
          Verifico que la ppágina editada exista
Given I initialize test "04_editar_pagina_B"
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
And I click a new "page"
And I wait for 1 seconds
And I open a lateral menu
And I wait for 1 seconds
And I enter nonexistent author
And I wait for 1 seconds
And I go to list "Pages" "Pages"
And I wait for 1 seconds
Then I check exists new page with this id, title and "DRAFT" state