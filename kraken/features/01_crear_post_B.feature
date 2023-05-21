Feature: Crear Post

@user2 @web
Scenario: Ingreso al sistema
          Navego a crear post
          Ingreso el titulo del post
          Publico el nuevo post superando el rango superior de fecha
          Vuelvo al listado de post
          Verifico que el post creado exista en la lista de post calendarizados
Given I initialize test "01_crear_post_B"
Given I navigate to editor "post"
And I wait for 2 seconds
When I enter and submit credentials
And I wait for 2 seconds
And I enter title
And I wait for 1 seconds
And I get new id
And I wait for 1 seconds
And I publish element with upper date limit
And I wait for 2 seconds
And I go to list "Posts" "Scheduled"
And I wait for 1 seconds
Then I check exists new "post" with this id and title