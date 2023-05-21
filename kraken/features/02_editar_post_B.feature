Feature: Editar Post

@user1 @web
Scenario: Ingreso al sistema
          Creo un post en borrador con caracteres especiales
          Vuelvo a la lista de borradores
          Selecciono el nuevo post
          Coloco autor inexistente
          Voy a la lista de posts borradores
          Verifico que el post editado exista
Given I initialize test "02_editar_post_B"
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
And I enter nonexistent author
And I wait for 1 seconds
And I go to list "Posts" "Drafts"
And I wait for 1 seconds
Then I check exists new "post" with this id and title