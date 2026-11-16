# Challenge 11 - Grafo de personas y ciudades

Grafo no dirigido donde cada persona y cada ciudad es un nodo. Cada persona tiene nombre y edad, y
esta conectada con la ciudad donde vive.

## Correr el proyecto

```
npm install
ng serve
```

## Estructura

`src/app/estructuras/grafo.ts` tiene la clase con los dos atributos de la diapositiva: la lista de
nodos y el objeto de adyacencia.

- `agregarNodo`: lo mete si no existe todavia y le crea su lista vacia de vecinos.
- `agregarArista`: lo agrega en los dos sentidos, porque el grafo no es dirigido.
- `buscarNodo`: lo busca en la lista de nodos.
- `imprimirAdyacencia` e `imprimirGrafo`: imprimen en consola.

Lo unico que le agregue fue el objeto `datos`, porque el grafo de la clase guarda solo nombres y el
challenge pide que cada persona tenga edad. El nombre sigue siendo la llave del objeto de
adyacencia; la edad va aparte.

`personasDe(ciudad)` responde la pregunta del challenge: los vecinos de una ciudad son justamente
las personas que viven ahi, asi que basta con mirar su lista de adyacencia y filtrar las que sean
de tipo persona.

## El dibujo

La diapositiva sugiere `react-d3-graph`, que es solo para React. Como el proyecto es en Angular,
el grafo se pinta con SVG en la plantilla: las ciudades se reparten en un circulo y las personas
se ponen alrededor de su ciudad, calculando las posiciones con seno y coseno. Cada arista es una
linea entre los dos puntos.

Al arrancar tambien se imprime el grafo en la consola del navegador, y al elegir una ciudad se
imprime su lista de adyacencia.
