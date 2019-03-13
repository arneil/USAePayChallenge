import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/cart.service';
import { Product } from '../core/data-types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartContents: Product[];

  displayedColumns: string[] = ['title', 'remove', 'price' ]

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartContents = this.cartService.getCartContents();
  }

  //TODO: Implement item removal
  remove(product) {

  }

  cartIsEmpty() {
    return this.cartContents.map(p => p.price).reduce((acc, value) => acc + value, 0) == 0;
  }

  getTotalCost() {
    return this.cartContents.map(p => p.price).reduce((acc, value) => acc + value, 0);
  }

}
