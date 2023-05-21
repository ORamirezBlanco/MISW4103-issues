# Pruebas Automatizadas de Software

## Entrega Semana 7

## Integrantes

- OSCAR EVELIO RAMIREZ BLANCO (o.ramirezb@uniandes.edu.co)
- WILLIAM ERNESTO BALLESTEROS BLANCO (w.ballesteros@uniandes.edu.co)
- RICARDO NICOLAS HÜG (r.hug@uniandes.edu.co)
- LUIS DANIEL ANGEL BELTRAN (l.angelb@uniandes.edu.co)

## Para más información
-  [Wiki](https://github.com/ORamirezBlanco/MISW4103-issues/wiki)

## Ejecución de las pruebas utilizando Kraken (Ubuntu):
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas
- Instalar node 14
- La herramienta requiere que se tenga ADB instalado para ejecutarse
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta kraken:
  **cd MISW4103-issues/kraken**
- Ejecutar: 
  **npm install**
- Modificar properties.json con las credenciales de usuario reemplazando <*email*>, <*passaword*> y habilitando <*strategy*> para evaluar estrategias (1) a-priori, (2) pseudo (3) aleatorio
- De ser necesario hacer un reemplazo en los features del la base de la URL donde se está ejecutando Ghost. Por defecto está configurado para ejecutarse contra http://localhost:2368
- Ejecutar: **npx kraken-node run**
## Ejecución de las pruebas utilizando playwright
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas  
- Confirmar la utilizacion de node 14 (14.18.0):
  **node -v**
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta playwright:
  **cd MISW4103-issues** y después **cd playwright**
- configurar las variables de entorno en el archivo **.env** que se encuentra en el directorio raiz con los parametros del sistema por cada sistema Ghost V3 y V4:
  **GHOST_PAGE, USER_EMAIL, USER_PASSW, GHOST_VERSION**, cambiar para USER_EMAIL el valor "<<user_email>>" y para USER_PASSW el valor "<<user_password>>", GHOST_PAGE, GHOST_VERSION y RESULT_IMAGES_PATH para cada sistema
- Configurar en el archivo **playwright.config.js** que se encuentra en el directorio raiz el arreglo **projects** para adicionar o retirar navegadores en la ejecucion de las pruebas.
- Ejecutar comando para instalar las librerias:
  **npm install**
- Ejecutar comando para lanzar las pruebas:
  - Funcionalidad Crear Post    **npx playwright test tests/ghost/F1/createPost**
  - Funcionalidad Editar Post   **npx playwright test tests/ghost/F2/editPost**
- Realizar la configuración para la otra version de Ghost

## Reporte diferencias visuales
- [Issues](https://github.com/ORamirezBlanco/MISW4103-issues/issues?q=Semana_7)

#
#

## Entrega Semana 6

## Integrantes

- OSCAR EVELIO RAMIREZ BLANCO (o.ramirezb@uniandes.edu.co)
- WILLIAM ERNESTO BALLESTEROS BLANCO (w.ballesteros@uniandes.edu.co)
- RICARDO NICOLAS HÜG (r.hug@uniandes.edu.co)
- LUIS DANIEL ANGEL BELTRAN (l.angelb@uniandes.edu.co)

## Para más información
-  [Wiki](https://github.com/ORamirezBlanco/MISW4103-issues/wiki)

## Funcionalidades

- Crear Post: permite crear un nuevo post.
- Editar Post: permite editar un post existente.

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


## Ejecución de las pruebas utilizando Kraken (Ubuntu): (REVISAR ENTREGA)
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas
- Instalar node 14
- La herramienta requiere que se tenga ADB instalado para ejecutarse
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta kraken:
  **cd MISW4103-issues/kraken**
- Ejecutar: 
  **npm install**
- Modificar features/web/step_definitions/properties.json con las credenciales de usuario reemplazando <EMAIL> y <PASSWORD>
- De ser necesario hacer un reemplazo en los features del la base de la URL donde se está ejecutando Ghost. Por defecto está configurado para ejecutarse contra http://localhost:2368
- Ejecutar: **npx kraken-node run**
## Ejecución de las pruebas utilizando playwright
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas  
- Confirmar la utilizacion de node 14 (14.18.0):
  **node -v**
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta playwright:
  **cd MISW4103-issues** y después **cd playwright**
- configurar las variables de entorno en el archivo **.env** que se encuentra en el directorio raiz con los parametros del sistema por cada sistema Ghost V3 y V4:
  **GHOST_PAGE, USER_EMAIL, USER_PASSW, GHOST_VERSION**, cambiar para USER_EMAIL el valor "<<user_email>>" y para USER_PASSW el valor "<<user_password>>", GHOST_PAGE, GHOST_VERSION y RESULT_IMAGES_PATH para cada sistema
- Configurar en el archivo **playwright.config.js** que se encuentra en el directorio raiz el arreglo **projects** para adicionar o retirar navegadores en la ejecucion de las pruebas.
- Ejecutar comando para instalar las librerias:
  **npm install**
- Ejecutar comando para lanzar las pruebas:
  - Funcionalidad Crear Post    **npx playwright test tests/ghost/F1/createPost**
  - Funcionalidad Editar Post   **npx playwright test tests/ghost/F2/editPost**
- Realizar la configuración para la otra version de Ghost

## Ejecución de la comparación de imagenes utilizando Resemble JS
- Ubicarse en la carpeta playwright:
  **cd resemble** 
- Ubicar las carpetas de las imágenes en un directorio de referencia 
  - ./tests/ghost/3.41/F1
  - ./tests/ghost/3.41/F2
  - ./tests/ghost/4.41/F1
  - ./tests/ghost/4.41/F2
- Realizar las configuraciones en el archivo config.json
    - "beforePath":"./tests/ghost/3.41"
    - "afterPath":"./tests/ghost/4.44"
- Ejecutar comando para instalar las librerias:
  **npm install**
- Ejecutar comando para lanzar la comparación:
  **node index.js**
- Los resultados se encuentra en la carpeta por cada subcarpeta en los directorios de referencia
  - ./results/F1/index.html  
  - ./results/F2/index.html
## Reporte diferencias visuales
- [Issues](https://github.com/ORamirezBlanco/MISW4103-issues/issues)

#
#

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
  
## Ejecución de las pruebas utilizando Kraken (Ubuntu):
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas
- Instalar node 14
- La herramienta requiere que se tenga ADB instalado para ejecutarse
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta kraken:
  **cd MISW4103-issues/kraken**
- Ejecutar: 
  **npm install**
- Modificar features/web/step_definitions/properties.json con las credenciales de usuario reemplazando <EMAIL> y <PASSWORD>
- De ser necesario hacer un reemplazo en los features del la base de la URL donde se está ejecutando Ghost. Por defecto está configurado para ejecutarse contra http://localhost:2368
- Ejecutar: **npx kraken-node run**
## Ejecución de las pruebas utilizando playwright
- Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas  
- Confirmar la utilizacion de node 14 (14.18.0):
  **node -v**
- Descargar el repositorio:
  **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
- Ubicarse en la carpeta playwright:
  **cd MISW4103-issues** y después **cd playwright**
- configurar las variables de entorno en el archivo **.env** que se encuentra en el directorio raiz con los parametros del sistema:
  **GHOST_PAGE, USER_EMAIL, USER_PASSW**, cambiar para USER_EMAIL el valor "<<user_email>>" y para USER_PASSW el valor "<<user_password>>" y GHOST_PAGE de ser necesario
- Configurar en el archivo **playwright.config.js** que se encuentra en el directorio raiz el arreglo **projects** para adicionar o retirar navegadores en la ejecucion de las pruebas.
- Ejecutar comando para instalar las librerias:
  **npm install**
- Ejecutar comando para lanzar las pruebas:
  **npx playwright test**


  Las imagenes con los resultados de las pruebas se pueden observar en la ruta **./results/**

  las estadisticas con los resultados de las pruebas se encuentran en la ruta **./playwright-report/index.html**
