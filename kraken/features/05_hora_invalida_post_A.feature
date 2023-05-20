Feature: Borrar Post

@user1 @web
Scenario: Ingreso al sistema
          Creo un nuevo post en borrador
          Vuelvo a la lista de borradores
          Verifico que el post exista
          Edito el post para que tenga un hora de publicación inválida
          Verifico la existencia del mensaje de error
Given I initialize test "05_borrar_post_B"
Given I navigate to editor "post"
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter title
And I wait for 1 seconds
And I get new id
And I wait for 1 seconds
And I go to list "Posts" "Drafts"
And I wait for 1 seconds
And I click a new "post"
And I wait for 1 seconds
And I open a lateral menu
And I wait for 1 seconds
And I enter invalid publish hour
And I wait for 1 seconds
Then I check invalid publish hour error message