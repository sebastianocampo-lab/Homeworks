# Challenge 06 - Arbol binario

Estructuras de Datos II - Clase 07. Proyecto en Angular con d3.

## Correrlo

```bash
npm install
npm start
```

Queda en http://localhost:4200

## Qué hace

- Arranca insertando la serie 50, 30, 70, 20, 40, 60, 80, 35, 65, 85 y la
  imprime por consola en inorden, preorden y postorden.
- Se pueden insertar mas numeros separados por coma. Los repetidos no se meten.
- `existe(valor)` dice si un numero esta en el arbol y lo pinta de naranja.
- Botones para volver a imprimir cada recorrido (sale en consola y en pantalla).
- El arbol se dibuja con `d3.tree()` de d3-hierarchy.

## Archivos

```
src/app/
├── estructuras/arbol-binario.ts   -> Nodo y ArbolBinario
├── componentes/dibujo-arbol/      -> dibujo con d3
└── paginas/pagina-arbol/          -> formularios y botones
```

Para dibujarlo, cada nodo se pasa al formato `{ valor, children }` que usa d3.
Si un nodo tiene un solo hijo se le mete un hijo vacio que no se pinta, para que
se vea si el hijo quedo a la izquierda o a la derecha.

Se puede comparar el resultado con https://visualgo.net/en/bst
