import { Type } from '@angular/core';

export interface ItemMenu {
  titulo: string;
  link: string;
  componente: Type<unknown> | null;
}
