# Pruebas Automatizadas de Software

## Entrega final

## Integrantes
- OSCAR EVELIO RAMIREZ BLANCO (o.ramirezb@uniandes.edu.co)
- WILLIAM ERNESTO BALLESTEROS BLANCO (w.ballesteros@uniandes.edu.co)
- RICARDO NICOLAS HÜG (r.hug@uniandes.edu.co)
- LUIS DANIEL ANGEL BELTRAN (l.angelb@uniandes.edu.co)

## Documentación
-  [Wiki](https://github.com/ORamirezBlanco/MISW4103-issues/wiki)

## Estrategia de pruebas
-  [Documento de estrategia](https://uniandes-my.sharepoint.com/:w:/r/personal/o_ramirezb_uniandes_edu_co/Documents/Q2/pruebas/w8/presupuesto.docx?d=w83a6ab5c6acb4f18b52350610ba0441d&csf=1&web=1&e=PdbZgI)

## Inventario de pruebas exploratorias
[Inventario de pruebas exploratorias](https://github.com/ORamirezBlanco/MISW4103-issues/files/11583314/inventario-pruebas-exploratorias-integradas.xlsx)

## Listado de incidencias
-  [Incidencias](https://github.com/ORamirezBlanco/MISW4103-issues/issues?page=1&q=error)

## Video explicativo
-  [Video](https://uniandes-my.sharepoint.com/:v:/g/personal/l_angelb_uniandes_edu_co/Eds37erAjTRAksf7Vis6BrgBo_l3N-t3wCvrnEgCwceCag?e=s3MvIf)

## Ejecución de artefactos generados
- Pruebas de reconocimiento
  - Ejecución de Monkey-Cypress:
    - Descargar el repositorio:
      **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
    - Ubicarse en la carpeta monkey-cypress:
      **cd MISW4103-issues/monkey-cypress**
    - Instalar node 14
    - Instalar dependencias:
      **npm install**
    - Modificar el archivo monkey-config.json especificando los valores de <*BASE_URL*>, <*EMAIL*> y <*PASSWORD*>
    - Ejecutar con el comando:
      **node_modules/.bin/cypress  run -C monkey-config.json**
    - Verificar la carpeta *result* para ver el reporte
  - Ejecución de RIPuppet:
    - Descargar el repositorio:
      **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
    - Ubicarse en la carpeta RIPuppetCoursera:
      **cd MISW4103-issues/RIPuppetCoursera**
    - Instalar node 14
    - Instalar dependencias:
      **npm install**
    - Modificar el archivo config.json especificando los valores de <*BASE_URL*>, <*EMAIL*> y <*PASSWORD*>
    - Ejecutar con el comando:
      **node index.js**
    - Verificar la carpeta *results* para ver el reporte
- Pruebas de extremo a extremo
  - Ejecución de Kraken:
    - Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas
    - Instalar node 14
    - La herramienta requiere que se tenga ADB instalado para ejecutarse
    - Descargar el repositorio:
      **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
    - Ubicarse en la carpeta kraken:
      **cd MISW4103-issues/kraken**
    - Ejecutar: 
      **npm install**
    - Modificar properties.json con las credenciales de usuario reemplazando <*email*>, <*passaword*> y habilitando <*strategy*> para evaluar estrategias (1) a-priori, (2) pseudo (3) aleatorio. 
    - De ser necesario hacer un reemplazo en los features del la base de la URL donde se está ejecutando Ghost. Por defecto está configurado para ejecutarse contra http://localhost:2368
    - Ejecutar: **npx kraken-node run**
  - Ejecución de Playwright:
    - Es necesario que la aplicación Ghost v3.41.1 se este ejecutando y su sistema sea alcanzable desde la maquina que se van a ejecutar las pruebas  
    - Confirmar la utilizacion de node 14 (14.18.0):
      - **node -v**
    - Podria llegar a ser necesario instalar playwright
      - *npx playwright install*
    - Descargar el repositorio:
      **git clone https://github.com/ORamirezBlanco/MISW4103-issues.git**
    - Ubicarse en la carpeta playwright:
      **cd MISW4103-issues** y después **cd playwright**
    - configurar las variables de entorno en el archivo **.env** que se encuentra en el directorio raiz con los parametros del sistema por cada sistema Ghost V3:
      - **GHOST_PAGE, USER_EMAIL, USER_PASSW, DATA_STRATEGY**, 
      - cambiar para USER_EMAIL el valor "<<user_email>>" y para USER_PASSW el valor "<<user_password>>", DATA_STRATEGY estrategias: 'a-priori', 'pseudo' 'aleatorio'.
    - Configurar en el archivo **playwright.config.js** que se encuentra en el directorio raiz el arreglo **projects** para adicionar o retirar navegadores en la ejecucion de las pruebas.
    - Ejecutar comando para instalar las librerias:
      **npm install**
    - Ejecutar comando para lanzar las pruebas:
      - **npx playwright test**
- Pruebas de regresión visual
  - Ejecución de Resemble JS:
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
    - [Reporte diferencias visuales](https://github.com/ORamirezBlanco/MISW4103-issues/issues)
- Escenarios de validación de datos
  - [Generación de escenarios](https://github.com/ORamirezBlanco/MISW4103-issues/wiki/Descripci%C3%B3n-de-c%C3%B3mo-los-120-escenarios-son-generados)
