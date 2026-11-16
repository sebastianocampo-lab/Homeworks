# Challenge 12 - Buscador con Trie y Heap

Buscador de productos por prefijo usando un Trie, y un Heap para devolver los K mas populares.

## Correr el proyecto

```
npm install
ng serve
```

Viene con el ejemplo de la diapositiva cargado: buscando `air` con K = 2 devuelve
`air force (95)` y `air max (90)`.

## El Trie

`src/app/estructuras/trie.ts`. El nodo tiene su valor, el `esFinDePalabra` y el mapa de hijos
donde la llave es un caracter. La informacion no esta en los nodos sino en el camino: la palabra
se arma recorriendo las aristas desde la raiz.

- `insertar`: parte la palabra en letras y va encadenando un nodo por cada una.
- `buscar`: baja letra por letra y al final revisa el `esFinDePalabra`.

Dos cosas que le agregue, porque el challenge las pide y la diapositiva no las trae:

- `popularidad` en el nodo donde termina la palabra, que es donde tiene sentido guardarla.
- `buscarPorPrefijo`, que baja hasta donde termina el prefijo y de ahi recoge recursivamente
  todas las palabras que cuelgan. La busqueda de la clase es exacta; esta devuelve todas las que
  empiezan igual.

## El Heap

`src/app/estructuras/heap.ts`. Es el MinHeap de la clase: `push` mete al final y sube con
`percolateUp`, `pop` cambia la raiz por el ultimo y baja con `percolateDown`, y `heapify` arregla
un arreglo completo empezando desde el ultimo padre.

El unico cambio es que el de la clase compara numeros sueltos y aca los elementos son objetos, asi
que las comparaciones son por `.popularidad`.

## El Top K

Esta en `app.ts`. La idea es no ordenar toda la lista: voy metiendo los productos al heap y cuando
pasa de K saco el minimo, que siempre esta en la raiz. Al final el heap queda con los K mas
populares.

Por eso se usa un **Min**Heap para buscar los **mayores**: el que esta en la raiz es el peor de los
que llevo, y es justo el que hay que botar cuando entra uno nuevo.
