Feature: Crear Post

@user1 @web
Scenario: Ingresar al sistema
          Navegar a crear Post
          Ingresar el título del Post          
          Verificar que aparezca el botón de eliminar Post en el menú lateral Post settings
          
 Given I navigate to page "http://localhost:2368/ghost/#/editor/post/"
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