Feature: Editar una Página

@user1 @web
Scenario: Ingreso al sistema
          Creo una nueva página en borrador
          Vuelvo al listado de página
          Navego a la nueva página
          Publico la página
          Verifico que la nueva página aparezca en el listado como publicada
  Given I navigate to page "http://localhost:3002/ghost/#/editor/page/"
  And I wait for 2 seconds
  When I enter email
  And I enter password
  And I wait for 1 seconds
  And I click submit
  And I wait for 2 seconds
  And I enter title
  And I wait for 1 seconds
  And I get new id
  And I click link "Pages"
  And I wait for 1 seconds
  And I click link "Pages"
  And I wait for 1 seconds
  And I click a new "page"
  And I click publish
  And I wait for 1 seconds
  And I click button "Publish"
  And I wait for 1 seconds
  And I click link "Pages"
  And I wait for 1 seconds
  And I click link "Pages"
  And I wait for 1 seconds
  Then I check exists new page with this id and "PUBLISHED" state