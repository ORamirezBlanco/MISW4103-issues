Feature: Editar una Página

@user1 @web
Scenario: Ingreso al sistema
          Creo una nueva página en borrador
          Vuelvo al listado de página
          Navego a la nueva página
          Edito el titulo extenso de la página
          Verifico que en el listado el título esté editado
Given I initialize test "04_editar_pagina_A"
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
And I enter sentence title
And I wait for 1 seconds
And I go to list "Pages" "Pages"
And I wait for 1 seconds
Then I check exists new "page" with this id and edit title