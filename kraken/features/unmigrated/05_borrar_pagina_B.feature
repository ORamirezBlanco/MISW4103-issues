Feature: Borrar Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una Página como Draft
          Volver a la lista de Páginas
          Abrir la Página y el menú lateral
          Dar clic en el botón Delete page
          Dar clic en el modal al botón Delete
          Verificar que no exista la Página

  Given I navigate to page "http://localhost:3002/ghost/#/editor/page"
  And I wait for 2 seconds
  When I enter email
  And I enter password
  And I wait for 1 seconds
  And I click submit
  And I wait for 2 seconds
  And I enter title
  And I wait for 1 seconds
  And I get new id
  And I wait for 1 seconds
  And I click link "Pages"  
  And I wait for 1 seconds
  And I click a new "page"
  And I wait for 1 seconds
  And I open a lateral menu
  And I wait for 1 seconds
  And I click delete button
  And I wait for 1 seconds
  And I click button "Delete"
  And I wait for 1 seconds
  Then I check not exists a new "page"