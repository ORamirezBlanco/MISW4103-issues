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
        
        Given I initialize test "02_editar_post_D"
        Given I navigate to editor "post"
        When I enter and submit credentials
        And I wait for 2 seconds
        And I enter naughty title
        And I wait for 1 seconds
        And I get new id
        And I wait for 1 seconds
        And I schedule element
        And I wait for 1 seconds
        And I go to list "Posts" "Scheduled"
        And I wait for 1 seconds
        And I click a new "post"
        And I wait for 1 seconds
        And I revert element "Scheduled" to Draft
        And I wait for 5 seconds
        And I go to list "Posts" "Drafts"
        Then I check exists post with this "DRAFT" state