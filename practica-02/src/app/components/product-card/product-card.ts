import { Component, Input } from '@angular/core';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() producto: Producto | null = null;
}