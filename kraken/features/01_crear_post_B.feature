Feature: Crear post

@user2 @web
Scenario: Ingreso al sistema
          Navego a crear post
          Ingreso el titulo del post
          Publico el nuevo post 
          Vuelvo al listado de post
          Verifico que el post creado exista en la lista de post publicados
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
 And I wait for 1 seconds
 And I click publish
 And I wait for 1 seconds
 And I click button "Publish"
 And I wait for 1 seconds
 And I click link "Posts"
 And I click link "Posts"
 And I wait for 1 seconds
 And I click link "Published"
 And I wait for 1 seconds
 Then I check exists new "post" with this id and title