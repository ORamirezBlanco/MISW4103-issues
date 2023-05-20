Feature: Borrar Post

@user1 @web
Scenario: Ingreso al sistema
          Creo un nuevo post
          Publico el post
          Verifico que el post exista
          Edito el post para que tenga un fecha de publicación inválida
          Verifico la existencia del mensaje de error
Given I initialize test "05_fecha_invalidada_post_A"
Given I navigate to editor "post"
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter title
And I wait for 1 seconds
And I get new id
And I wait for 1 seconds
And I publish element
And I wait for 2 seconds
And I go to list "Posts" "Published"
And I wait for 1 seconds
And I click a new "post"
And I wait for 1 seconds
And I open a lateral menu
And I wait for 1 seconds
And I enter invalid publish date
And I wait for 1 seconds
Then I check invalid publish date error message