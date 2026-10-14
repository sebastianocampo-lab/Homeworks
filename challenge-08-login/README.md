# Challenge 08 - Login y rutas privadas

Estructuras de Datos II. Proyecto en Angular 20.

## Correr el proyecto

```
npm install
ng serve
```

Queda en http://localhost:4200

## Usuario de prueba

- Email: user@mail.com
- Password: 123

## Que tiene

- `servicios/auth.ts`: servicio con un signal `usuario`, mas `entrar`, `salir` y `estaLogueado`.
- `guardianes/sesion-guard.ts`: guard que manda al login si no hay sesion.
- `paginas/login`: formulario con email, password y boton, valida contra el usuario de prueba.
- Dos paginas privadas con los ejercicios del challenge 07:
  - `/arbol`: el arbol n-ario del menu con los recorridos DFS y BFS impresos en pantalla y en
    consola, y un buscador para revisar si un item esta en el arbol.
  - `/menu`: el menu lateral que se pinta recorriendo el mismo arbol. Las secciones son rutas
    hijas de `/menu`.
- El correo del usuario se ve en la barra de arriba mientras hay sesion, con el boton de salir.
- La opcion "Cerrar sesion" del menu lateral tambien termina la sesion.

## Para probar las rutas privadas

1. Entrar directo a http://localhost:4200/arbol sin sesion, redirige al login.
2. Iniciar sesion, entra a /arbol y aparece el correo arriba.
3. Darle a Salir y volver a entrar a /arbol, vuelve a redirigir.
