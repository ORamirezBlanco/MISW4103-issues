Feature: Borrar Post

@user1 @web
Scenario: Ingreso al sistema
          Creo un nuevo post
          Publico el post
          Verifico que el post exista
          Borro el post
          Verifico que el post no exista
Given I initialize test "05_borrar_post_A"
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
And I delete element
And I wait for 1 seconds
And I confirm delete element
And I wait for 1 seconds
Then I check not exists a new "post"