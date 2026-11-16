# Challenge 10 - Tareas con Supabase

Registro, login, CRUD de tareas y lista en tiempo real.

## 1. Crear el proyecto en Supabase

1. Entrar a https://supabase.com y darle a *Start your project*. Registrarse con GitHub o con correo.
2. Aceptar o crear la organizacion y elegir el plan Free.
3. Dashboard → **New project**.
   - Nombre: `challenge-10-tareas`
   - Database password: guardala, no la vuelve a mostrar.
   - Region: South America (Sao Paulo), que es la mas cercana.
4. Esperar un par de minutos mientras lo crea.

## 2. Copiar las credenciales

Project Settings → **API Keys** (o el boton Connect):

- **Project URL**: `https://xxxx.supabase.co`
- **Publishable key** (`sb_publishable_...`) o la anon key vieja.

La secret key / service_role NO se usa en el frontend porque se salta el RLS.

Pegar las dos en `src/environments/environment.ts` y en
`src/environments/environment.development.ts`:

```ts
export const environment = {
  supabaseUrl: 'https://xxxx.supabase.co',
  supabaseKey: 'sb_publishable_xxxxxxxx',
};
```

## 3. Crear la tabla

SQL Editor → New query:

```sql
create table tareas (
    id bigint generated always as identity primary key,
    titulo text not null,
    completada boolean default false,
    user_id uuid references auth.users default auth.uid(),
    created_at timestamptz default now()
);
```

El `default auth.uid()` es lo que hace que al insertar solo haya que mandar el titulo: el id del
usuario lo pone la base de datos sola.

## 4. Prender el RLS

```sql
alter table tareas enable row level security;

create policy "ver mis tareas" on tareas
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "crear mis tareas" on tareas
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "editar mis tareas" on tareas
  for update to authenticated using ((select auth.uid()) = user_id);

create policy "borrar mis tareas" on tareas
  for delete to authenticated using ((select auth.uid()) = user_id);
```

Sin esto la tabla queda abierta. Con esto cada usuario solo ve y toca sus propias tareas.

## 5. Prender el realtime

Table Editor → tabla `tareas` → **Enable Realtime**. O por SQL:

```sql
alter publication supabase_realtime add table tareas;
```

Si se salta este paso la lista funciona igual, pero no se actualiza sola al cambiar algo desde
otra pestania.

## 6. Configurar el login

Authentication → **Sign In / Providers** → que Email este habilitado.

- *Confirm email*: viene activo. Para probar rapido, apagarlo; si se deja prendido toca confirmar
  el correo antes de poder entrar.
- **URL Configuration** → Site URL: `http://localhost:4200`

## 7. Crear el bucket de avatares

Storage → **New bucket** → nombre `avatars`.

Despues, en el SQL Editor:

```sql
create policy "subir a mi carpeta" on storage.objects
    for insert to authenticated
    with check (
        bucket_id = 'avatars'
        and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "reemplazar mis archivos" on storage.objects
  for update to authenticated
  using ((storage.foldername(name))[1] = (select auth.uid())::text);

create policy "eliminar mis archivos" on storage.objects
  for delete to authenticated
  using (
      bucket_id = 'avatars'
      and (storage.foldername(name))[1] = (select auth.uid())::text
  );
```

Por eso en `perfil.component.ts` la ruta del archivo arranca con el id del usuario: es lo que
revisa la politica.

## 8. Correr el proyecto

```
npm install
ng serve
```

Entrar a http://localhost:4200, crear una cuenta con *Crear cuenta*, y ya se pueden agregar,
completar y borrar tareas. Para ver el realtime, abrir la misma pagina en dos pestanias y crear
una tarea en una.

## Estructura

- `services/supabase.service.ts`: crea el cliente con las credenciales del environment.
- `services/auth.service.ts`: registro, login, logout y el signal de la sesion.
- `services/tareas.service.ts`: listar, crear, completar, borrar y escuchar los cambios.
- `guards/auth.guard.ts`: protege `/tareas` y `/perfil`, pregunta la sesion a Supabase.
- `tareas/`: la lista, con el canal de realtime que se cierra en el ngOnDestroy.
- `perfil/`: sube la foto al bucket y muestra la url publica.
