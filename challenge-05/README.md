# Challenge 05 - Cola del cajero

Estructuras de Datos II - Clase 06. Proyecto en Angular.

App de una sola pantalla que maneja la fila (Queue) de un cajero automático.
Cada persona tiene nombre, monto a retirar y hora de llegada.

## Correrlo

```bash
npm install
npm start
```

Queda en http://localhost:4200

## Qué hace

- Arranca con 5 personas de prueba con horas de llegada aleatorias.
- El formulario solo pide nombre y monto, la hora de llegada la pone el sistema.
- La fila se muestra ordenada por hora de llegada (FIFO).
- Botones de dequeue(), peek() y print(), más size() e isEmpty() y la lista de
  los que ya se atendieron.

## Archivos

```
src/app/
├── estructuras/queue.ts
├── modelos/persona.ts
├── datos/personas-iniciales.ts
├── componentes/
│   ├── formulario-persona/  -> @Output (personaCreada)
│   └── lista-fila/          -> @Input [personas]
└── paginas/pagina-cajero/   -> aqui esta la cola
```

La hora del que llega se genera después de la última persona de la fila
(`horaDespuesDe`), porque si fuera cualquier hora al azar el orden mostrado no
coincidiría con el orden real en que dequeue() saca a la gente.
