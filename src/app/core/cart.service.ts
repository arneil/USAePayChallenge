import { Injectable } from '@angular/core';
import { Product } from './data-types';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartContents: Product[];

  constructor() {
    this.cartContents = [];
  }

  addToCart(product) {
    this.cartContents.push(product);
    console.log(this.cartContents);
  }

  removeFromCart(index) {
    this.cartContents = this.cartContents.slice(0, index+1).concat(this.cartContents.slice(index+1, this.cartContents.length));
  }

  emptyCart() {
    this.cartContents = [];
  }

  getNumItems() {
    return this.cartContents.length;
  }
}