Feature: Editar Post

@user1 @web
Scenario: Ingresar al sistema
          Crear un Post programado
          Volver a la lista de Post Publicados
          Ir a la lista de Post con estado Scheduled
          Abril el Post y cambiar su estado a Draft
          Volver a la lista de Post Publicados
          Ir a la lista de Post con estado Draft
          Verificar que el Post editado cuente con el estado Draft
          
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
  And I wait for 1 seconds
  And I click publish
  And I wait for 1 seconds
  And I click schedule
  And I wait for 1 seconds
  And I click button save
  And I wait for 1 seconds
  And I click link "Posts"
  And I wait for 1 seconds
  And I click link "Scheduled"
  And I wait for 1 seconds
  And I click a new "post"
  And I wait for 1 seconds
  And I click publish
  And I wait for 1 seconds
  And I click unpublished
  And I wait for 1 seconds
  And I click button save
  And I wait for 1 seconds
  And I click link "Posts"
  And I wait for 1 seconds  
  And I click link "Drafts"
  And I wait for 1 seconds 
  Then I check exists "post" with this id and status draft