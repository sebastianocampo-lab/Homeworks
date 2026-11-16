# Challenge 13 - Buscador de Gifs

Busca gifs en la API de Giphy escribiendo en un campo y los muestra en pantalla.

## 1. Sacar la API key

1. Entrar a https://developers.giphy.com/ y crear la cuenta.
2. Dashboard → **Create an App** → elegir **API** (no SDK).
3. Ponerle nombre y descripcion. Queda creada con una API key tipo
   `Ns4NdhIX2lHEqu9xdgsozNuiNyuy937q`.
4. Copiar esa key.

La documentacion de la busqueda esta en
https://developers.giphy.com/docs/api/endpoint#search

## 2. Pegar la key

En `src/environments/environment.ts` y en `src/environments/environment.development.ts`:

```ts
export const environment = {
  giphyApiKey: 'tu_api_key',
};
```

Los dos archivos los genera `ng generate environments`. El de `.development` es el que usa
`ng serve`; el otro es el del build de produccion.

## 3. Correr el proyecto

```
npm install
ng serve
```

Escribir algo en el campo y darle buscar.

## Como funciona

`services/gifs.service.ts` arma los parametros con `URLSearchParams` y llama la API con `fetch`,
igual que el ejemplo de la diapositiva:

```ts
const params = new URLSearchParams({
  api_key: environment.giphyApiKey,
  q: texto,
  limit: '25',
  offset: '0',
  rating: 'g',
  lang: 'es',
});

const res = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);
```

Dos detalles que valen para sustentar:

- `fetch` no lanza error con un 401 o un 404, solo falla si no hay red. Por eso toca revisar
  `res.ok` a mano y lanzar el error uno mismo. Si la key esta mal, Giphy responde 401 y ahi se ve.
- El estado vive en signals (`gifs`, `cargando`, `error`), asi la pantalla se actualiza sola sin
  tener que avisarle a nadie.

Si sale un 429 es que se paso del limite de peticiones de la key de prueba; espera un momento.
