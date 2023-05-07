Feature: Borrar

@user1 @web
Scenario: Ingreso al sistema
          Creo un nuevo post como borrador
          Verifico que el post exista
          Borro el post
          Verifico que el post no exista
  Given I navigate to page "http://localhost:2369/ghost/#/editor/post/"
  And I wait for 2 seconds
  When I enter email
  And I enter password
  And I wait for 1 seconds
  And I click submit
  And I wait for 2 seconds
  And I enter title
  And I wait for 1 seconds
  And I get new id
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Drafts"
  And I wait for 1 seconds
  And I click a new "post"
  And I open a lateral menu
  And I wait for 1 seconds
  And I click delete button
  And I wait for 1 seconds
  And I click button "Delete"
  And I wait for 1 seconds
  Then I check not exists a new "post"