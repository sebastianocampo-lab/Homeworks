import { Component, Input } from '@angular/core';
import { Miembro } from '../../models/miembro';

@Component({
  selector: 'app-comite',
  imports: [],
  templateUrl: './comite.html',
  styleUrl: './comite.css'
})
export class Comite {
  @Input() miembro: Miembro | null = null;
}