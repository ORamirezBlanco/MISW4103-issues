Feature: Crear Post

@user1 @web
Scenario: Ingresar al sistema
          Navegar a crear Post
          Ingresar el título del Post
          Publicar nuevo Post programado
          Volver al listado de Post
          Verificar que el Post creado exista en la lista de Post publicados con estado SCHEDULED
          
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
 Then I check exists new "post" with this id and title and status schedule