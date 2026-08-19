// TAREA 01 - ARRAYS
// Presentado por Sebastian Ocampo - 224055
 //Investigación y uso de todas las funciones (métodos) de Array en JavaScript
// ---------------------------------------------------------------------------
 //Cada método se explica brevemente y se demuestra con un ejemplo ejecutable, puedes hacerlo con la consola del navegador, o con la extension node en tu VS.


// Los soguientes metodos que encontraremos permiten modificar arrays utilizando las funciones de JS 

// 1. Funcion PUSH

let frutas = ["manzana", "pera"];  // Aqui creamos el array con el contenido inicial de 0, 1, 2, ...
frutas.push("uva");   // Aqui agregamos el elemento al final de array 
console.log("push():", frutas); // Con este print podemos ver como quedaria el arreglo modificado ["manzana", "pera", "uva"]

// 2. POP

let ultimaFruta = frutas.pop(); // Continuamos con el mismo arreglo anterior y utilizamos la funcion POP para eliminar el ultimo elemento del arreglo 
console.log("pop():", frutas, "| eliminado:", ultimaFruta);  // Con este print podemos ver como quedaria el arreglo modificado 

// 3. Shift

let primeraFruta = frutas.shift(); // Continuamos con el mismo arreglo anterior y utilizamos la funcion Shift para eliminar el primer elemento del arreglo 
console.log("shift():", frutas, "| eliminado:", primeraFruta); //  Con este print podemos ver como quedaria el arreglo modificado 

// 4. Unshift

frutas.unshift("banano"); // Continuamos con el mismo arreglo anterior y utilizamos la funcion Unshift para agregar un primer elemento al arreglo 
console.log("unshift():", frutas); //  Con este print podemos ver como quedaria el arreglo modificado 

// 5. Splice

let numeros = [1, 2, 3, 4, 5]; // Creamos un nuevo arreglo para los siguientes ejemplos
let eliminados = numeros.splice(1, 2, "a", "b", "c"); // Con esta funcion podemos de alguna forma renonmbrar o modificar el arreglo. Esta funcion nos permite agregar, eliminar o remplazar elementos dentro del Array...
 // ...indicando la posicion de cada elemento
console.log("splice():", numeros, "| eliminados:", eliminados); //  Con este print podemos ver como quedaria el arreglo modificado 

// 6. Sort

let desordenado = [40, 1, 5, 200]; // Creamos un nuevo arreglo sin orden
desordenado.sort((a, b) => a - b);  // Usamos la funcion sort para ordenar los elementos de menor a mayor
console.log("sort():", desordenado); //  Con este print podemos ver como quedaria el arreglo modificado 

// 7. Reverse

let orden = [1, 2, 3];  // Creamos un nuevo arreglo ejeemplo
orden.reverse(); // Empleamos la funcion reverse en el arreglo para revertir el orden del arreglo inicial en este caso daria [3,2,1]
console.log("reverse():", orden); //  Con este print podemos ver como quedaria el arreglo modificado 

// 8. Fill

let relleno = [1, 2, 3, 4].fill(0, 1, 3); // Creamos un arreglo y usamos la funcion fill para rellenar con el valor 0 desde la posicion 1 hasta la 3 (sin incluir la 3)
console.log("fill():", relleno); //  Con este print podemos ver como quedaria el arreglo modificado 

// 9. CopyWithin

let copyEj = [1, 2, 3, 4, 5]; // Creamos un nuevo arreglo ejemplo
copyEj.copyWithin(0, 3); // Usamos la funcion copyWithin para copiar un pedazo del mismo arreglo (desde la posicion 3 hasta el final) y pegarlo empezando en la posicion 0
console.log("copyWithin():", copyEj); //  Con este print podemos ver como quedaria el arreglo modificado 


// Los siguientes metodos con arrays nos permiten trabajar con ellos pero estos metodos sueltan un array nuevo

// 10. Concat

let a1 = [1, 2];  //Creacion array 1
let a2 = [3, 4];  //Creacion array 2
console.log("concat():", a1.concat(a2));  // //  Con este print podemos ver como quedaria la Unificacion del array 1 y 2 suelta un array 3

// 11. Slice

let letras = ["a", "b", "c", "d", "e"];  // Creamos un array lleno de strings y podemos con esta funcion extraer un pedazo del array nombrando sus posiciones en este caso 1, 3
console.log("slice():", letras.slice(1, 3)); // //  Con este print podemos ver como quedaria el arreglo ["b", "c"]

// 12. Join

console.log("join():", letras.join(" - ")); // Utilizando el array anterior de letras este JOiN nos permite unificar todos sus elementosd en un array separado por un guion

// 13. Map

let dobles = [1, 2, 3].map(n => n * 2); // Creamos un arreglo y usamos la funcion map para aplicarle una operacion a cada elemento (en este caso multiplicarlo por 2) y sacar un arreglo nuevo con esos resultados
console.log("map():", dobles); //  Con este print podemos ver como quedaria el arreglo nuevo con los valores duplicados

// 14. Filter

let pares = [1, 2, 3, 4, 5, 6].filter(n => n % 2 === 0); // Usamos filter para recorrer el arreglo y quedarnos solo con los elementos que cumplan la condicion, en este caso que sean pares
console.log("filter():", pares); //  Con este print podemos ver como quedaria el arreglo nuevo solo con los numeros pares

// 15. Reduce

let suma = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0); // Usamos reduce para ir acumulando un solo valor recorriendo todo el arreglo, en este caso vamos sumando cada numero empezando el acumulador en 0
console.log("reduce():", suma); //  Con este print podemos ver el resultado final de la suma de todo el arreglo

// 16. ReduceRight

let resultado = ["1", "2", "3"].reduceRight((acc, n) => acc + n); // Funciona igual que reduce pero recorriendo el arreglo de derecha a izquierda
console.log("reduceRight():", resultado); //  Con este print podemos ver el resultado de unir los elementos empezando desde el ultimo

// 17. ForEach

[10, 20, 30].forEach((n, i) => console.log(`forEach() índice ${i}:`, n)); // Usamos forEach para recorrer cada elemento del arreglo y ejecutar una accion con el, en este caso solo imprimir su indice y su valor, esta funcion no retorna nada nuevo

// 18. Find

let encontrado = [5, 12, 8, 130, 44].find(n => n > 10); // Usamos find para buscar y traer el PRIMER elemento del arreglo que cumpla la condicion, en este caso el primero que sea mayor a 10
console.log("find():", encontrado); //  Con este print podemos ver cual fue el primer elemento encontrado

// 19. FindIndex

let indice = [5, 12, 8, 130, 44].findIndex(n => n > 10); // Funciona igual que find pero en vez de traer el elemento nos trae la posicion (indice) donde esta ese primer elemento
console.log("findIndex():", indice); //  Con este print podemos ver en que posicion quedo el primer elemento que cumple la condicion

// 20. FindLast

let ultimoEncontrado = [5, 12, 8, 130, 44].findLast(n => n > 10); // Funciona igual que find pero en vez del primero nos trae el ULTIMO elemento que cumple la condicion
console.log("findLast():", ultimoEncontrado); //  Con este print podemos ver cual fue el ultimo elemento encontrado

// 21. FindLastIndex

let ultimoIndice = [5, 12, 8, 130, 44].findLastIndex(n => n > 10); // Funciona igual que findIndex pero nos trae la posicion del ultimo elemento que cumple la condicion
console.log("findLastIndex():", ultimoIndice); //  Con este print podemos ver en que posicion quedo el ultimo elemento que cumple la condicion

// 22. Includes

console.log("includes():", [1, 2, 3].includes(2)); // Usamos includes para preguntarle al arreglo si contiene o no un valor especifico, nos responde con true o false

// 23. IndexOf

console.log("indexOf():", ["a", "b", "c", "b"].indexOf("b")); // Usamos indexOf para que nos diga en que posicion esta la primera coincidencia de un valor, si no lo encuentra nos devuelve -1

// 24. LastIndexOf

console.log("lastIndexOf():", ["a", "b", "c", "b"].lastIndexOf("b")); // Funciona igual que indexOf pero nos busca la posicion de la ULTIMA coincidencia del valor

// 25. Every

console.log("every():", [2, 4, 6].every(n => n % 2 === 0)); // Usamos every para preguntar si TODOS los elementos del arreglo cumplen una condicion, en este caso si todos son pares

// 26. Some

console.log("some():", [1, 3, 5, 6].some(n => n % 2 === 0)); // Usamos some para preguntar si AL MENOS UNO de los elementos cumple la condicion, no hace falta que todos la cumplan

// 27. Flat

let anidado = [1, [2, 3], [4, [5, 6]]]; // Creamos un arreglo con otros arreglos dentro (arreglos anidados)
console.log("flat():", anidado.flat(2)); // Usamos flat para aplanar esos arreglos anidados y dejarlos en un solo nivel, el numero que le pasamos indica cuantos niveles de profundidad aplanar

// 28. FlatMap

console.log("flatMap():", [1, 2, 3].flatMap(n => [n, n * 2])); // Esta funcion es como una mezcla de map y flat, primero le aplica la funcion a cada elemento y luego aplana el resultado en un solo nivel

// 29. At

console.log("at():", [10, 20, 30].at(-1)); // Usamos at para traer el elemento que esta en una posicion especifica, la diferencia con corchetes es que aqui podemos usar numeros negativos para contar desde el final, en este caso el ultimo elemento

// 30. ToString

console.log("toString():", [1, 2, 3].toString()); // Usamos toString para convertir todo el arreglo en un solo texto (string) separando los elementos por comas

// 31. ToSorted

let original = [3, 1, 2]; // Creamos un arreglo desordenado
let ordenadoNuevo = original.toSorted(); // Usamos toSorted que hace lo mismo que sort pero sin modificar el arreglo original, nos entrega un arreglo nuevo ya ordenado
console.log("toSorted():", ordenadoNuevo, "| original intacto:", original); //  Con este print podemos comprobar que el arreglo original no cambio y el nuevo si quedo ordenado

// 32. ToReversed

console.log("toReversed():", [1, 2, 3].toReversed()); // Funciona igual que reverse pero sin modificar el arreglo original, nos entrega un arreglo nuevo con el orden invertido

// 33. ToSpliced

console.log("toSpliced():", [1, 2, 3, 4].toSpliced(1, 2, "x")); // Funciona igual que splice pero sin modificar el arreglo original, nos entrega un arreglo nuevo ya con los cambios aplicados

// 34. With

console.log("with():", [1, 2, 3].with(1, "reemplazado")); // Usamos with para reemplazar el valor de una posicion especifica y que nos entregue un arreglo nuevo con ese cambio, sin tocar el arreglo original


// Los siguientes metodos tienen como diferencia que al lugar de llamar un Array creado previamente lo hacemos mediante funciones Array propias como isArray from, of etc que nos permiten verificar contenidos etc

// 35. Array.isArray

console.log("Array.isArray():", Array.isArray([1, 2, 3])); // Usamos Array.isArray para verificar si lo que le pasamos realmente es un arreglo, nos responde con true o false

// 36. Array.from

console.log("Array.from():", Array.from("hola")); // Usamos Array.from para convertir algo iterable (como un string) en un arreglo, en este caso cada letra de la palabra queda como un elemento del arreglo

// 37. Array.of

console.log("Array.of():", Array.of(7, 8, 9)); // Usamos Array.of para crear un arreglo directamente con los valores que le pasamos como argumentos

// 38. Entries

for (const [i, valor] of ["x", "y"].entries()) { // Usamos entries para recorrer el arreglo obteniendo al mismo tiempo la posicion (indice) y el valor de cada elemento
  console.log(`entries() -> índice ${i}:`, valor); //  Con este print podemos ver cada indice junto con su valor
}

// 39. Keys

console.log("keys():", [...["x", "y", "z"].keys()]); // Usamos keys para obtener solamente los indices (posiciones) del arreglo

// 40. Values

console.log("values():", [...["x", "y", "z"].values()]); // Usamos values para obtener solamente los valores del arreglo, recorriendolos uno por uno