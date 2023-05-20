Feature: Crear Post

@user1 @web
Scenario: Ingresar al sistema
          Navegar a crear Post
          Ingresar el título del Post          
          Verificar que aparezca el botón de eliminar Post en el menú lateral Post settings
    
    Given I initialize test "01_crear_post_D"
    Given I navigate to editor "post"
    When I enter and submit credentials
    And I wait for 2 seconds
    And I enter naughty title
    And I wait for 1 seconds
    And I open a lateral menu
    And I wait for 1 seconds 
    Then I check exists delete button