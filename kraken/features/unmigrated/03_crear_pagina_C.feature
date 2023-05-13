Feature: Crear Página

@user1 @web
Scenario: Ingresar al sistema
          Crear una Página programada
          Volver a la lista de Páginas          
          Verificar que la Página cuente con el estado Scheduled
          
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
  And I click publish
  And I wait for 1 seconds
  And I click schedule
  And I wait for 1 seconds
  And I click button save
  And I wait for 1 seconds
  And I click link "Pages"  
  And I wait for 1 seconds  
  Then I check exists new "page" with this id and title and status schedule