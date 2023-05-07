# Pruebas Automatizadas de Software

## Entrega Semana 5

## Integrantes

- OSCAR EVELIO RAMIREZ BLANCO (o.ramirezb@uniandes.edu.co)
- WILLIAM ERNESTO BALLESTEROS BLANCO (w.ballesteros@uniandes.edu.co)
- RICARDO NICOLAS HÜG (r.hug@uniandes.edu.co)
- LUIS DANIEL ANGEL BELTRAN (l.angelb@uniandes.edu.co)

## Funcionalidades

- Crear Post: permite crear un nuevo post.
- Editar Post: permite editar un post existente.
- Crear Página: permite crear una nueva página.
- Editar Página: permite editar una página existente.
- Borrar elemento: permite eliminar un elemento de publicación ya sea un post, una página o un tag

## Lista de Escenarios
- Crear Post
  - Escenario 1:
    - Ingreso al sistema
    - Navego a crear post
    - Ingreso el titulo del nuevo post
    - Vuelvo al listado de post
    - Verifico que el post creado exista en la lista de post borradores
  - Escenario 2:
    - Ingreso al sistema
    - Navego a crear post
    - Ingreso el titulo del post
    - Publico el nuevo post 
    - Vuelvo al listado de post
    - Verifico que el post creado exista en la lista de post publicados
  - Escenario 3:
    - Ingreso al sistema
    - Creo un nuevo post en borrador
    - Calendarizo el nuevo post
    - Verifico que exista el post creado como calendarizado  
  - Escenario 4:
    - Ingreso al sistema
    - Creo una nueva página en borrador
    - Verifico que se genere el id del post / verifico que aparezca el botón borrar
- Editar Post
  - Escenario 1:
    - Ingreso al sistema
    - Creo un post en borrador
    - Vuelvo a la lista de borradores
    - Selecciono el nuevo post
    - Edito el título del post
    - Vuelvo a la lista de borradores
    - Verifico que el título haya cambiado
  - Escenario 2:
    - Ingreso al sistema
    - Creo un post en borrador
    - Vuelvo a la lista de borradores
    - Selecciono el nuevo post
    - Publico el post
    - Voy a la lista de posts publicados
    - Verifico que el post editado exista  
  - Escenario 3:
    - Ingreso al sistema
    - Creo un post como publicado
    - Vuelvo a la lista de publicados
    - Selecciono el nuevo post
    - Edito el post como borrador
    - Vuelvo a la lista de borradores
    - Verifico que el post existe como borrador
  - Escenario 4:
    - Ingreso al sistema
    - Creo un post como calendarizado
    - Vuelvo a la lista de calendarizados
    - Selecciono el nuevo post
    - Edito el post como borrador
    - Vuelvo a la lista de borradores
    - Verifico que el post existe como borrador
- Crear Página
  - Escenario 1: 
    - Ingreso al sistema
    - Creo una nueva página en borrador
    - Verifico que exista la pagina creada como borrador
  - Escenario 2:
    - Ingreso al sistema
    - Creo una nueva página en borrador
    - Publico la nueva página
    - Verifico que exista la pagina creada como publicada
  - Escenario 3:
    - Ingreso al sistema
    - Creo una nueva página en borrador
    - Calendarizo la nueva página
    - Verifico que exista la pagina creada como calendarizada  
  - Escenario 4:
    - Ingreso al sistema
    - Creo una nueva página en borrador
    - Verifico que se genere el id de la pagina / verifico que aparezca el botón borrar
- Editar Página
  - Escenario 1:
    - Ingreso al sistema
    - Creo una nueva página como borrador
    - Vuelvo al listado de página
    - Navego a la nueva página
    - Edito el titulo de la página
    - Verifico que en el listado el título esté editado
  - Escenario 2:
    - Ingreso al sistema
    - Creo una nueva página como borrador
    - Vuelvo al listado de página
    - Navego a la nueva página
    - Publico la página
    - Verifico que la nueva página aparezca en el listado como publicada
  - Escenario 3:
    - Ingreso al sistema
    - Creo una nueva página como publicada
    - Vuelvo al listado de página
    - Navego a la nueva página
    - Edito la página como borrador
    - Verifico que la nueva página aparezca en el listado como borrador  
  - Escenario 4:
    - Ingreso al sistema
    - Creo una nueva página como calendarizada
    - Vuelvo al listado de página
    - Navego a la nueva página
    - Edito la página como borrador
    - Verifico que la nueva página aparezca en el listado como borrador  
- Borrar Elemento
  - Escenario 1:
    - Ingreso al sistema
    - Creo un nuevo post como publicado
    - Verifico que el post exista
    - Borro el post
    - Verifico que el post no exista
  - Escenario 2:
    - Ingreso al sistema
    - Creo un nuevo post como borrador
    - Verifico que el post exista
    - Borro el post
    - Verifico que el post no exista
  - Escenario 3:
    - Ingreso al sistema
    - Creo una nueva pagina como publicada
    - Verifico que la pagina exista
    - Borro la página
    - Verifico que la página no exista
  - Escenario 4:
    - Ingreso al sistema
    - Creo una nueva página como borrador
    - Verifico que la página exista
    - Borro la página
    - Verifico que la página no exista
  
## Ejecución de las pruebas utilizando Kraken:
- Instalar node 14
- Ejecutar: npm install
- Modificar features/web/step_definitions/properties.json con las credenciales de usuario
- De ser necesario hacer un reemplazo en los features del la base de la URL donde se está ejecutando Ghost 
- Ejecutar: npx kraken-node run


## Ejecución de las pruebas utilizando playwright
- Confirmar la utilizacion de node 14 (14.18.0):
  **node -v**
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta playwright:
  **cd MISW4103-issues
  cd playwright**
- configurar las variables de entorno con los parametros del sistema:
  **GHOST_PAGE
  USER_EMAIL
  USER_PASSW**
- Ejecutar comando para instalar las librerias:
  **npm i**
- Ejecutar comando para lanzar las pruebas:
  **npx playwright test**
  
  Las imagenes con los resultados de las pruebas se pueden observar en la ruta **./results/**
