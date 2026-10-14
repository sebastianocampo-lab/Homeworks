export type TipoNodo = 'carpeta' | 'archivo';

export interface NodoArchivo {
  id?: string;
  nombre: string;
  tipo: TipoNodo;
  padreId: string | null;
  correo: string;
}