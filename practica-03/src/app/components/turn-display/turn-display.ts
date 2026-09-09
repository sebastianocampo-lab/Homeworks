import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-turn-display',
  imports: [],
  templateUrl: './turn-display.html',
  styleUrl: './turn-display.css'
})
export class TurnDisplay {
  @Input() turno: string | null = null;
}