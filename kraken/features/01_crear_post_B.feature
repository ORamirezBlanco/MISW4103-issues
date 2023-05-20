Feature: Crear Post

@user2 @web
Scenario: Ingreso al sistema
          Navego a crear post
          Ingreso el titulo del post con caracteres especiales
          Publico el nuevo post 
          Vuelvo al listado de post
          Verifico que el post creado exista en la lista de post publicados
Given I initialize test "01_crear_post_B"
Given I navigate to editor "post"
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter naughty title
And I wait for 1 seconds
And I get new id
And I wait for 1 seconds
And I publish element
And I wait for 2 seconds
And I go to list "Posts" "Published"
And I wait for 1 seconds
Then I check exists new "post" with this id and title