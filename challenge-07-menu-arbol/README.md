# Challenge 07 - Menu lateral con arbol N-ario

Estructuras de Datos II - Clase 07. Proyecto en Angular.

(En la diapositiva sale como Challenge 09.)

## Correrlo

```bash
npm install
npm start
```

Queda en http://localhost:4200

## Qué hace

- El menu es un arbol N-ario. Cada item tiene `titulo`, `link` y `componente`.
- El sidebar se pinta recorriendo el arbol: cada opcion se pinta a si misma y
  despues a sus hijos, entonces sirve para cualquier cantidad de niveles.
- Las rutas de Angular tambien salen del arbol (`sacarRutas`), no estan
  escritas a mano.
- Al cargar se imprime el menu por consola con DFS y con BFS.

## Archivos

```
src/app/
├── estructuras/arbol-nario.ts   -> Nodo, dfs, bfs y sacarRutas
├── modelos/item-menu.ts         -> titulo, link, componente
├── datos/menu.ts                -> aqui se arma el arbol del menu
├── componentes/
│   ├── menu-lateral/            -> el sidebar
│   └── opcion-menu/             -> un item del menu (se llama a si mismo para los hijos)
└── paginas/                     -> un componente por cada opcion del menu
```

Para agregar una opcion nueva solo hay que crear su componente y meterla en
`datos/menu.ts` con `agregarHijo`. El menu y la ruta salen solos.
