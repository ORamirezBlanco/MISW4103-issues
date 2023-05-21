Feature: Crear Post

@user1 @web
Scenario: Ingreso al sistema
          Navego a crear post
          Ingreso el titulo de un nuevo post mayor a 257 caracteres
          Verifico que no se crea el id del post
Given I initialize test "01_crear_post_A"
Given I navigate to editor "post"
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter big title
And I wait for 1 seconds
Then I check not exists new id