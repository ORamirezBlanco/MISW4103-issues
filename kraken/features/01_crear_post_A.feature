Feature: Crear Post

@user1 @web
Scenario: Ingreso al sistema
          Navego a crear post
          Ingreso el titulo del nuevo post
          Vuelvo al listado de post
          Verifico que el post creado exista en la lista de post borradores
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
 And I click link "Posts"
 And I click link "Posts"
 And I wait for 1 seconds
 And I click link "Drafts"
 And I wait for 1 seconds
 Then I check exists new "post" with this id and title
