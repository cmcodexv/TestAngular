# CARLOS MARADIAGA | PRUEBA BACKEND
Backend hecho con ExpressJS, MySQL y TypeScript usando Repository Pattern. 

## Dependencias
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/get-started/08_using_compose/)


### Pasos

- Ejecutar archivo "docker-compose.yml" con Docker Compose:

```sh
 docker-compose up -d --build
```

- Una vez corriendo el contendor, acceder a [Adminer](https://hub.docker.com/_/adminer/) (localhost:8080).

- No es necesario configurar las variables de entorno (.env), ya que por motivos de pruebas he dejado el archivo development.env visible.
 
- Credenciales para ingresar a MYSQL desde [Adminer](https://hub.docker.com/_/adminer/):
 ```sh
host: db
user: root
password: example
database: inventDB
```
- Importar el script de la base de datos que se encuentra dentro de la capeta "src/common/db".

- La colección de consultas para [Postman](https://www.postman.com/) se encuentran en la carpeta "src/common/postman".
- Importar la colección del punto anterior en [Postman](https://www.postman.com/).
- He definido la ruta: http://localhost:5000/check para verificar si el proyecto está corriendo.

## Observaciones

A continuación detallo algunas observaciones que considero importante aclarar:

- Resolví la problemática planteada por medio de un trigger de tipo before de modo que si se cambian los registros de la tabla compañía dinámicamente se asigne el nuevo id, para precio hice la validación ingresando manualmente los valores ya que de hacerlo dinámico me hubiera tomado más tiempo estructurar la tabla de tipo paquete para cumplir con lo anterior.
 
- La manera en la que diseñé la base de datos fue la que consideré óptima para la prueba, sé que en un proyecto real se puede mejorar, anexando disparadores con el fin de crear bitácoras, por dar un ejemplo.

- La tabla "company_zip" es de tipo colección para poder almacenar muchos códigos postales a una misma compañía.


