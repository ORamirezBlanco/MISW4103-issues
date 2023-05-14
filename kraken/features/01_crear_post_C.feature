Feature: Crear Post

@user1 @web
Scenario: Ingresar al sistema
          Navegar a crear Post
          Ingresar el título del Post
          Publicar nuevo Post programado
          Volver al listado de Post
          Verificar que el Post creado exista en la lista de Post publicados con estado SCHEDULED
          
      Given I initialize test "01_crear_post_C"
      Given I navigate to editor "post"
      When I enter and submit credentials
      And I wait for 2 seconds
      And I enter title      
      And I wait for 1 seconds
      And I get new id
      And I wait for 1 seconds
      And I schedule element
      And I wait for 1 seconds
      And I go to list "Posts" "Scheduled"
      And I wait for 1 seconds
      Then I check exists post with this "SCHEDULED" state