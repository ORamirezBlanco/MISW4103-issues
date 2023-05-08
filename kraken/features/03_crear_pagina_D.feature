Feature: Crear Página

@user1 @web
Scenario: Ingresar al sistema
          Ingresar a la vista de crear Página
          Ingresar el título
          Abrir el menú lateral Page settings        
          Verificar que se encuentre el botón de eliminar Página
          
  Given I navigate to page "http://localhost:2368/ghost/#/editor/page"
  And I wait for 2 seconds
  When I enter email
  And I enter password
  And I wait for 1 seconds
  And I click submit
  And I wait for 2 seconds
  And I enter title
  And I wait for 1 seconds
  And I click button settings
  And I wait for 1 seconds 
  Then I check exists delete button