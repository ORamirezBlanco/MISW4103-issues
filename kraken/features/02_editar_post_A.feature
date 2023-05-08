Feature: Editar Post

@user1 @web
Scenario: Ingreso al sistema
          Creo un post en borrador
          Vuelvo a la lista de borradores
          Selecciono el nuevo post
          Edito el título del post
          Vuelvo a la lista de borradores
          Verifico que el título haya cambiado
  Given I navigate to page "http://localhost:2368/ghost/#/editor/post/"
  And I wait for 2 seconds
  When I enter email
  And I enter password
  And I wait for 1 seconds
  And I click submit
  And I wait for 2 seconds
  And I enter title
  And I wait for 1 seconds
  And I get new id
  And I wait for 2 seconds
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Drafts"
  And I wait for 1 seconds
  And I click a new "post"
  And I wait for 1 seconds
  And I enter edit title
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Drafts"
  And I wait for 2 seconds
  Then I check exists new "post" with this id and edit title