# Challenge 04 - Pila de libros

Estructuras de Datos II - Clase 06. Proyecto en Angular.

App de una sola pantalla que maneja una pila (Stack) de libros con Name, ISBN,
Author y Editorial.

## Correrlo

```bash
npm install
npm start
```

Queda en http://localhost:4200

## Qué hace

- Arranca con 4 libros de prueba metidos con push().
- El formulario agrega un libro nuevo, que queda en el tope.
- La lista se muestra del tope hacia la base (LIFO).
- Botones de pop(), peek() y print(), más size() e isEmpty().

## Archivos

```
src/app/
├── estructuras/stack.ts
├── modelos/libro.ts
├── datos/libros-iniciales.ts
├── componentes/
│   ├── formulario-libro/   -> @Output (libroCreado)
│   └── lista-libros/       -> @Input [libros]
└── paginas/pagina-libros/  -> aqui esta la pila
```

La página es la dueña de la pila y los componentes solo reciben datos por Input
o avisan por Output.
